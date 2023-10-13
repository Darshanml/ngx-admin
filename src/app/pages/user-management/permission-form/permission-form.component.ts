/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { PermissionsService } from '../services/permissions.service';


@Component({
  selector: 'ngx-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
})
export class PermissionFormComponent implements OnInit {
  permissionForm!: FormGroup;
  selectedPermissionId: number | null = null;
  public formTitle: string = 'Create Permission';
  permissions: any[] = [];
  public sortDirection: 'asc' | 'desc' = 'desc';
  public isEditing: boolean = false;
  displayedColumns: string[] = ['id', 'permissionName', 'permissionDescription', 'actions'];

  
  

  constructor(
    private formBuilder: FormBuilder,
    private permissionsService: PermissionsService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const permissionId = Number(params.get('id'));
      if (permissionId) {
        this.isEditing = true;
        this.selectedPermissionId = permissionId;
        this.getPermissionById(permissionId);
        this.formTitle = 'Update Permission';
      }
    });
    this.getPermissions();
    this.initPermissionForm();
  }

  getPermissions() {
    this.permissionsService.getPermissions().subscribe(
      (response) => {
        this.permissions = response.sort((a: { id: number; }, b: { id: number; }) => {
          if (this.sortDirection === 'asc') {
            return a.id - b.id; // Sort in ascending order based on id
          } else {
            return b.id - a.id; // Sort in descending order based on id
          }
        });
        console.log(this.permissions);
      },
      (error) => {
        console.error('Error getting permissions:', error);
      }
    );
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.getPermissions();
  }

  initPermissionForm() {
    this.permissionForm = this.formBuilder.group({
      permissionName: ['', Validators.required],
      permissionDescription: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.permissionForm.invalid) {
      this.permissionForm.markAllAsTouched();
      return;
    }

    if (this.isEditing) {
      this.updatePermission();
    } else {
      this.createPermission();
    }

    this.onReset();
    this.isEditing = false;
  }

  createPermission() {
    const permissionData = {
      permissionName: this.permissionForm.value.permissionName,
      permissionDescription: this.permissionForm.value.permissionDescription,
    };
  
    this.permissionsService.createPermission(permissionData).subscribe(
      (response) => {
        console.log('Permission created:', response);
        this.getPermissions();
        this.permissionForm.reset();
        this.toastrService.success(`New Permission Created - Name: ${permissionData.permissionName}, Description: ${permissionData.permissionDescription}`, 'Success', {
          duration: 10000, // Toast display duration in milliseconds
           // Toast position
        });
      },
      (error) => {
        console.error('Error creating permission:', error);
        this.toastrService.danger('Error creating permission', 'Error', {
          duration: 10000,
          
        });
      }
    );
  }

  editPermission(permission: any) {
    this.isEditing = true;
    this.selectedPermissionId = permission.id;
    this.permissionForm.patchValue({
      permissionName: permission.permissionName,
      permissionDescription: permission.permissionDescription,
    });
    this.formTitle = 'Update Permission';
    this.router.navigate(['permission-form', permission.id]);
  }

  updatePermission() {
    if (this.selectedPermissionId !== null) {
      const permissionId = this.selectedPermissionId;
      const permissionData = {
        permissionName: this.permissionForm.value.permissionName,
        permissionDescription: this.permissionForm.value.permissionDescription,
      };

      this.permissionsService.updatePermission(permissionId, permissionData).subscribe(
        (response) => {
          console.log('Permission updated:', response);
          const updatedPermission = this.permissions.find((permission) => permission.id === permissionId);
          if (updatedPermission) {
            updatedPermission.permissionName = permissionData.permissionName;
            updatedPermission.permissionDescription = permissionData.permissionDescription;
          }

          this.getPermissions();
          this.permissionForm.reset();
          this.isEditing = false;
          this.selectedPermissionId = null;
          this.toastrService.success(`Permission with ID ${permissionId} updated.`, 'Success', {
            duration: 5000,
            
          });
          this.router.navigate(['permission-form']);
        },
        (error) => {
          console.error('Error updating permission:', error);
          this.toastrService.danger('Error updating permission', 'Error', {
            duration: 10000,
            
          });
        }
      );
    }
  }

  getPermissionById(permissionId: number) {
    this.permissionsService.getPermissionById(permissionId).subscribe(
      (response) => {
        this.permissionForm.patchValue({
          permissionName: response.permissionName,
          permissionDescription: response.permissionDescription,
        });
      },
      (error) => {
        console.error('Error getting permission by ID:', error);
      }
    );
  }

  deletePermission(permissionId: number) {
    if (confirm('Are you sure you want to delete this permission?')) {
      this.permissionsService.deletePermission(permissionId).subscribe(
        () => {
          console.log('Permission deleted:', permissionId);
          this.getPermissions();
          this.toastrService.success(`Permission with ID ${permissionId} deleted.`, 'Success', {
            duration: 5000,
            
          });
        },
        (error) => {
          console.error('Error deleting permission:', error);
          this.toastrService.danger('Error deleting permission', 'Error', {
            duration: 10000,
        
          });
        }
      );
    }
  }
  
  onReset() {
    this.permissionForm.reset();
    this.isEditing = false;
    this.selectedPermissionId = null;
    this.formTitle = 'Create Permission';
  }
}*/
/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { PermissionsService } from '../services/permissions.service';

@Component({
  selector: 'ngx-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
})
export class PermissionFormComponent implements OnInit {
  permissionForm!: FormGroup;
  selectedPermissionId: number | null = null;
  public formTitle: string = 'Create Permission';
  permissions: any[] = [];
  public sortDirection: 'asc' | 'desc' = 'desc';
  public isEditing: boolean = false;
  displayedColumns: string[] = ['id', 'permissionName', 'permissionDescription', 'actions'];

  selectedTable: any; // This should be of the type representing your table data
  originalTable: any; // To store the original state of the selectedTable

  constructor(
    private formBuilder: FormBuilder,
    private permissionsService: PermissionsService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const permissionId = Number(params.get('id'));
      if (permissionId) {
        this.isEditing = true;
        this.selectedPermissionId = permissionId;
        this.getPermissionById(permissionId);
        this.formTitle = 'Update Permission';
      }
    });
    this.getPermissions();
    this.initPermissionForm();
  }

  getPermissions() {
    this.permissionsService.getPermissions().subscribe(
      (response) => {
        this.permissions = response.sort((a: { id: number; }, b: { id: number; }) => {
          if (this.sortDirection === 'asc') {
            return a.id - b.id; // Sort in ascending order based on id
          } else {
            return b.id - a.id; // Sort in descending order based on id
          }
        });
        console.log(this.permissions);
      },
      (error) => {
        console.error('Error getting permissions:', error);
      }
    );
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.getPermissions();
  }

  initPermissionForm() {
    this.permissionForm = this.formBuilder.group({
      permissionName: ['', Validators.required],
      permissionDescription: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.permissionForm.invalid) {
      this.permissionForm.markAllAsTouched();
      return;
    }

    if (this.isEditing) {
      this.updatePermission();
    } else {
      this.createPermission();
    }

    this.onReset();
    this.isEditing = false;
  }

  createPermission() {
    const permissionData = {
      permissionName: this.permissionForm.value.permissionName,
      permissionDescription: this.permissionForm.value.permissionDescription,
    };
  
    this.permissionsService.createPermission(permissionData).subscribe(
      (response) => {
        console.log('Permission created:', response);
        this.getPermissions();
        this.permissionForm.reset();
        this.toastrService.success(`New Permission Created - Name: ${permissionData.permissionName}, Description: ${permissionData.permissionDescription}`, 'Success', {
          duration: 10000, // Toast display duration in milliseconds
           // Toast position
        });
      },
      (error) => {
        console.error('Error creating permission:', error);
        this.toastrService.danger('Error creating permission', 'Error', {
          duration: 10000,
          
        });
      }
    );
  }

  editPermission(permission: any) {
    this.isEditing = true;
    this.selectedPermissionId = permission.id;
    this.permissionForm.patchValue({
      permissionName: permission.permissionName,
      permissionDescription: permission.permissionDescription,
    });
    this.formTitle = 'Update Permission';
    this.router.navigate(['permission-form', permission.id]);
  }

  updatePermission() {
    if (this.selectedPermissionId !== null) {
      const permissionId = this.selectedPermissionId;
      const permissionData = {
        permissionName: this.permissionForm.value.permissionName,
        permissionDescription: this.permissionForm.value.permissionDescription,
      };

      this.permissionsService.updatePermission(permissionId, permissionData).subscribe(
        (response) => {
          console.log('Permission updated:', response);
          const updatedPermission = this.permissions.find((permission) => permission.id === permissionId);
          if (updatedPermission) {
            updatedPermission.permissionName = permissionData.permissionName;
            updatedPermission.permissionDescription = permissionData.permissionDescription;
          }

          this.getPermissions();
          this.permissionForm.reset();
          this.isEditing = false;
          this.selectedPermissionId = null;
          this.toastrService.success(`Permission with ID ${permissionId} updated.`, 'Success', {
            duration: 5000,
            
          });
          this.router.navigate(['permission-form']);
        },
        (error) => {
          console.error('Error updating permission:', error);
          this.toastrService.danger('Error updating permission', 'Error', {
            duration: 10000,
            
          });
        }
      );
    }
  }

  getPermissionById(permissionId: number) {
    this.permissionsService.getPermissionById(permissionId).subscribe(
      (response) => {
        this.permissionForm.patchValue({
          permissionName: response.permissionName,
          permissionDescription: response.permissionDescription,
        });
      },
      (error) => {
        console.error('Error getting permission by ID:', error);
      }
    );
  }

  deletePermission(permissionId: number) {
    if (confirm('Are you sure you want to delete this permission?')) {
      this.permissionsService.deletePermission(permissionId).subscribe(
        () => {
          console.log('Permission deleted:', permissionId);
          this.getPermissions();
          this.toastrService.success(`Permission with ID ${permissionId} deleted.`, 'Success', {
            duration: 5000,
            
          });
        },
        (error) => {
          console.error('Error deleting permission:', error);
          this.toastrService.danger('Error deleting permission', 'Error', {
            duration: 10000,
        
          });
        }
      );
    }
  }
  
  onReset() {
    this.permissionForm.reset();
    this.isEditing = false;
    this.selectedPermissionId = null;
    this.formTitle = 'Create Permission';
  }
}*/




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { PermissionsService } from '../services/permissions.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { PermissionPreviewDialogComponent } from '../dialogs/permission-preview-dialog/permission-preview-dialog.component';

import * as XLSX from 'xlsx';
  import { saveAs } from 'file-saver';
  import * as pdfMake from 'pdfmake/build/pdfmake';
  import * as pdfFonts from 'pdfmake/build/vfs_fonts';
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
})
export class PermissionFormComponent implements OnInit {
  permissionForm!: FormGroup;
  selectedPermissionId: number | null = null;
  public formTitle: string = 'Create Permission';
  permissions: any[] = [];
  public sortDirection: 'asc' | 'desc' = 'desc';
  public isEditing: boolean = false;
  editMode: boolean = false;
  editedIndex: number = -1;
 

  constructor(
    private formBuilder: FormBuilder,
    private permissionsService: PermissionsService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      this.getPermissions();
      this.initPermissionForm();
    }
  
    getPermissions() {
      this.permissionsService.getPermissions().subscribe(
        (response) => {
          this.permissions = response.sort((a: { id: number; }, b: { id: number; }) => {
            if (this.sortDirection === 'asc') {
              return a.id - b.id; // Sort in ascending order based on id
            } else {
              return b.id - a.id; // Sort in descending order based on id
            }
          });
          this.permissions = response;
          console.log(this.permissions);
        },
        (error) => {
          console.error('Error getting permissions:', error);
        }
      );
    }

    toggleSortDirection() {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      this.getPermissions();
    }
  
    initPermissionForm() {
      this.permissionForm = this.formBuilder.group({
        permissionName: ['', Validators.required],
        permissionDescription: ['', Validators.required],
      });
    }
  
    onSubmit() {
      if (this.permissionForm.invalid) {
        this.permissionForm.markAllAsTouched();
        return;
      }
  
      if (this.editMode) {
        this.updatePermission();
      } else {
        this.createPermission();
      }
  
      this.onReset();
    }
  
    createPermission() {
      const permissionData = {
        permissionName: this.permissionForm.value.permissionName,
        permissionDescription: this.permissionForm.value.permissionDescription,
      };
  
      this.permissionsService.createPermission(permissionData).subscribe(
        (response) => {
          console.log('Permission created:', response);
          this.getPermissions();
          this.permissionForm.reset();
          this.toastrService.success(
            `New Permission Created - Name: ${permissionData.permissionName}, Description: ${permissionData.permissionDescription}`,
            'Success'
          );
        },
        (error) => {
          console.error('Error creating permission:', error);
          this.toastrService.danger('Error creating permission', 'Error');
        }
      );
    }
  
    editPermission(index: number) {
      this.editMode = true;
      this.isEditing = true;
      this.editedIndex = index;
      // Load the permission data to the form for editing
      const editedPermission = this.permissions[index];
      this.permissionForm.setValue({
        permissionName: editedPermission.permissionName,
        permissionDescription: editedPermission.permissionDescription,
      });
      this.formTitle = 'Update Permission'; 
    }
  
    updatePermission() {
      const permissionId = this.permissions[this.editedIndex].id;
      const permissionData = {
        permissionName: this.permissionForm.value.permissionName,
        permissionDescription: this.permissionForm.value.permissionDescription,
      };
  
      this.permissionsService.updatePermission(permissionId, permissionData).subscribe(
          (response) => {
            console.log('Permission updated:', response);
            this.getPermissions();
            this.permissionForm.reset();
            this.editMode = false;
            this.editedIndex = -1;
            this.toastrService.success(
              `Permission with ID ${permissionId}, Name ${permissionData.permissionName} updated.`,
              'Success'
            );
          },
          (error) => {
            console.error('Error updating permission:', error);
            this.toastrService.danger('Error updating permission', 'Error');
          }
        );
    }


  

  deletePermission(permissionId: number) {
    this.dialogService
      .open(ConfirmDialogComponent, {
        context: {
          title: 'Confirm Deletion',
          message: 'Are you sure you want to delete this permission?',
        },
      })
      .onClose.subscribe((result) => {
        if (result === 'confirm') {
          this.permissionsService.deletePermission(permissionId).subscribe(
            () => {
              console.log('Permission deleted:', permissionId);
              this.getPermissions();
              this.toastrService.success(`Permission with ID ${permissionId} deleted.`, 'Success', {
                duration: 5000,
              });
            },
            (error) => {
              console.error('Error deleting permission:', error);
              this.toastrService.danger('Error deleting permission', 'Error', {
                duration: 10000,
              });
            }
          );
        }
      });
  }

  downloadAsExcel() {
    // Prepare the data for the Excel file (excluding the "Actions" column)
    const data = this.permissions.map((permission) => ({
      Id: permission.id,
      'Permission Name': permission.permissionName,
      'Permission Description': permission.permissionDescription,
    }));
  
    // Create an Excel worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  
    // Create an Excel workbook with the worksheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Permissions List': worksheet },
      SheetNames: ['Permissions List'],
    };
  
    // Convert the workbook to a binary Excel file (in xlsx format)
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the Excel file with the desired name
    const fileName = 'Permissions_List.xlsx';
    const excelBlob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelBlob, fileName);
  }

  downloadAsPDF() {
    // Prepare the data for the PDF (excluding the "Actions" column)
    const data = this.permissions.map((permission) => [
      permission.id.toString(),
      permission.permissionName,
      permission.permissionDescription,
    ]);
  
    // Column headers for the PDF table
    const headers = ['Id', 'Permission Name', 'Permission Description'];
  
    // Create a document definition for pdfmake
    const docDefinition = {
      content: [
        { text: 'Permissions List', style: 'header' },
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
    pdfDoc.download('Permissions_List.pdf');
  }
  
  
  
  onReset() {
    this.permissionForm.reset();
    this.editMode = false;
    this.editedIndex = -1;
    this.isEditing = false;
    this.formTitle = 'Create Permission';
  }

  openPreviewDialog(permission: any) {
    this.dialogService.open(PermissionPreviewDialogComponent, {
      context: { previewData: permission },
    });
  }
}

