import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from '../services/roles.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { RolePreviewDialogComponent } from '../dialogs/role-preview-dialog/role-preview-dialog.component';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-role-form', // Change the selector to 'ngx-role-form' for ngx-admin compatibility.
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'], // Use .scss extension for styling.
})
export class RoleFormComponent implements OnInit {
  roleForm!: FormGroup;
  selectedRoleId: number | null = null;
  public formTitle: string = 'Create Role';
  public roles: { id: number; roleName: string; roleDescription: string }[] = [];
  public sortDirection: 'asc' | 'desc' = 'desc';
  public isEditing: boolean = false;
  editedIndex: number = -1;
  

  constructor(
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRoles();
    this.initRoleForm();
  }

  getRoles() {
    this.rolesService.getRoles().subscribe(
      (response) => {
        this.roles = response.sort((a: { id: number }, b: { id: number }) => {
          if (this.sortDirection === 'asc') {
            return a.id - b.id; // Sort in ascending order based on id
          } else {
            return b.id - a.id; // Sort in descending order based on id
          }
        });
        this.roles = response;
        console.log(this.roles);
      },
      (error) => {
        console.error('Error getting roles:', error);
      }
    );
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.getRoles();
  }

  initRoleForm() {
    this.roleForm = this.formBuilder.group({
      roleName: ['', Validators.required],
      roleDescription: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }

    if (this.isEditing) {
      this.updateRole();
    } else {
      this.createRole();
    }

    this.onReset();
  }

  createRole() {
    const roleData = {
      roleName: this.roleForm.value.roleName,
      roleDescription: this.roleForm.value.roleDescription,
    };

    this.rolesService.createRole(roleData).subscribe(
      (response) => {
        console.log('Role created:', response);
        this.getRoles();
        this.roleForm.reset();
        this.toastrService.success(
          `New Role Created - Name: ${roleData.roleName}, Description: ${roleData.roleDescription}`,
          'Success'
        );
      },
      (error) => {
        console.error('Error creating role:', error);
        this.toastrService.danger('Error creating role', 'Error');
      }
    );
  }

  editRole(index: number) {
    this.isEditing = true;
    this.editedIndex = index;
    // Load the role data to the form for editing
    const editedRole = this.roles[index];
    this.roleForm.setValue({
      roleName: editedRole.roleName,
      roleDescription: editedRole.roleDescription,
    });
    this.formTitle = 'Update Role';
  }

  updateRole() {
    const roleId = this.roles[this.editedIndex].id;
    const roleData = {
      roleName: this.roleForm.value.roleName,
      roleDescription: this.roleForm.value.roleDescription,
    };

    this.rolesService.updateRole(roleId, roleData).subscribe(
      (response) => {
        console.log('Role updated:', response);
        this.getRoles();
        this.roleForm.reset();
        this.isEditing = false;
        this.editedIndex = -1;
        this.toastrService.success(`Role with ID ${roleId}, Name ${roleData.roleName} updated.`, 'Success');
      },
      (error) => {
        console.error('Error updating role:', error);
        this.toastrService.danger('Error updating role', 'Error');
      }
    );
  }

  deleteRole(roleId: number) {
    this.dialogService
      .open(ConfirmDialogComponent, {
        context: {
          title: 'Confirm Deletion',
          message: 'Are you sure you want to delete this role?',
        },
      })
      .onClose.subscribe((result) => {
        if (result === 'confirm') {
          this.rolesService.deleteRole(roleId).subscribe(
            () => {
              console.log('Role deleted:', roleId);
              this.getRoles();
              this.toastrService.success(`Role with ID ${roleId} deleted.`, 'Success', {
                duration: 5000,
              });
            },
            (error) => {
              console.error('Error deleting role:', error);
              this.toastrService.danger('Error deleting role', 'Error', {
                duration: 10000,
              });
            }
          );
        }
      });
  }

  onReset() {
    this.roleForm.reset();
    this.isEditing = false;
    this.editedIndex = -1;
    this.formTitle = 'Create Role';
  }

  downloadAsExcel() {
    // Prepare the data for the Excel file (excluding the "Actions" column)
    const data = this.roles.map((role) => ({
      Id: role.id,
      'Role Name': role.roleName,
      'Role Description': role.roleDescription,
    }));
  
    // Create an Excel worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  
    // Create an Excel workbook with the worksheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Roles List': worksheet },
      SheetNames: ['Roles List'],
    };
  
    // Convert the workbook to a binary Excel file (in xlsx format)
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the Excel file with the desired name
    const fileName = 'Roles_List.xlsx';
    const excelBlob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelBlob, fileName);
  }
  
  downloadAsPDF() {
    // Prepare the data for the PDF (excluding the "Actions" column)
    const data = this.roles.map((role) => [
      role.id.toString(),
      role.roleName,
      role.roleDescription,
    ]);
  
    // Column headers for the PDF table
    const headers = ['Id', 'Role Name', 'Role Description'];
  
    // Create a document definition for pdfmake
    const docDefinition = {
      content: [
        { text: 'Roles List', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*'],
            body: [
              headers,
              ...data,
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };
  
    // Generate the PDF document
    const pdfDoc = pdfMake.createPdf(docDefinition);
  
    // Download the PDF file with the desired name
    pdfDoc.download('Roles_List.pdf');
  }

  openPreviewDialog(role: any) {
    this.dialogService.open(RolePreviewDialogComponent, {
      context: { previewData: role },
    });
  }
  
}
