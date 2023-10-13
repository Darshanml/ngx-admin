import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { UserPreviewDialogComponent } from '../dialogs/user-preview-dialog/user-preview-dialog.component';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-user-form', // Change the selector to 'ngx-user-form' for ngx-admin compatibility.
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'], // Use .scss extension for styling.
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  selectedUserId: number | null = null;
  public formTitle: string = 'Create User';
  public users: any[] = [];
  public sortDirection: 'asc' | 'desc' = 'desc';
  public isEditing: boolean = false;
  editedIndex: number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUser();
    this.initUserForm();
  }

  getUser() {
    this.userService.getUser().subscribe(
      (response) => {
        this.users = response.sort((a: { id: number }, b: { id: number }) => {
          if (this.sortDirection === 'asc') {
            return a.id - b.id; // Sort in ascending order based on id
          } else {
            return b.id - a.id; // Sort in descending order based on id
          }
        });
        this.users = response;
        console.log(this.users);
      },
      (error) => {
        console.error('Error getting users:', error);
      }
    );
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.getUser();
  }

  initUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dob: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    if (this.isEditing) {
      this.updateUser();
    } else {
      this.createUser();
    }

    this.onReset();
  }

  createUser() {
    const userData = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      phoneNumber: this.userForm.value.phone,
      DateOfBirth: this.userForm.value.dob,
      address: this.userForm.value.address,
    };

    this.userService.createUser(userData).subscribe(
      (response) => {
        console.log('User created:', response);
        this.getUser();
        this.userForm.reset();
        this.toastrService.success(
          `New User Created - First Name: ${userData.firstName}, Last Name: ${userData.lastName}`,
          'Success'
        );
      },
      (error) => {
        console.error('Error creating user:', error);
        this.toastrService.danger('Error creating user', 'Error');
      }
    );
  }

  editUser(index: number) {
    this.isEditing = true;
    this.editedIndex = index;
    // Load the user data to the form for editing
    const editedUser = this.users[index];
    this.userForm.setValue({
      firstName: editedUser.firstName,
      lastName: editedUser.lastName,
      email: editedUser.email,
      phone: editedUser.phoneNumber,
      dob: this.formatDate(editedUser.DateOfBirth),
      address: editedUser.address,
    });
    this.formTitle = 'Update User';
  }

  formatDate(date: string | Date): string {
    const newDate = new Date(date);
    return newDate.toISOString().split('T')[0];
  }

  updateUser() {
    const userId = this.users[this.editedIndex].id;
    const userData = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      phoneNumber: this.userForm.value.phone,
      DateOfBirth: this.userForm.value.dob,
      address: this.userForm.value.address,
    };

    this.userService.updateUser(userId, userData).subscribe(
      (response) => {
        console.log('User updated:', response);
        this.getUser();
        this.userForm.reset();
        this.isEditing = false;
        this.editedIndex = -1;
        this.toastrService.success(`User with ID ${userId}, Name ${userData.firstName} updated.`, 'Success');
      },
      (error) => {
        console.error('Error updating user:', error);
        this.toastrService.danger('Error updating user', 'Error');
      }
    );
  }

  deleteUser(userId: number) {
    this.dialogService
      .open(ConfirmDialogComponent, {
        context: {
          title: 'Confirm Deletion',
          message: 'Are you sure you want to delete this user?',
        },
      })
      .onClose.subscribe((result) => {
        if (result === 'confirm') {
          this.userService.deleteUser(userId).subscribe(
            () => {
              console.log('User deleted:', userId);
              this.getUser();
              this.toastrService.success(`User with ID ${userId} deleted.`, 'Success', {
                duration: 5000,
              });
            },
            (error) => {
              console.error('Error deleting user:', error);
              this.toastrService.danger('Error deleting user', 'Error', {
                duration: 10000,
              });
            }
          );
        }
      });
  }

  downloadAsExcel() {
    // Prepare the data for the Excel file (excluding the "Actions" column)
    const data = this.users.map((user) => ({
      Id: user.id,
      'First Name': user.firstName,
      'Last Name': user.lastName,
      'Email': user.email,
      'Phone Number': user.phoneNumber,
      'Date Of Birth': user.DateOfBirth,
      'Address': user.address,
    }));
  
    // Create an Excel worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  
    // Create an Excel workbook with the worksheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Users List': worksheet },
      SheetNames: ['Users List'],
    };
  
    // Convert the workbook to a binary Excel file (in xlsx format)
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the Excel file with the desired name
    const fileName = 'Users_List.xlsx';
    const excelBlob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelBlob, fileName);
  }
  
  downloadAsPDF() {
    // Prepare the data for the PDF (excluding the "Actions" column)
    const data = this.users.map((user) => [
      user.id.toString(),
      user.firstName,
      user.lastName,
      user.email,
      user.phoneNumber,
      this.formatDate(user.DateOfBirth),
      user.address,
    ]);
  
    // Column headers for the PDF table
    const headers = ['Id', 'First Name', 'Last Name', 'Email', 'Phone Number', 'Date Of Birth', 'Address'];
  
    // Set fixed column widths for the PDF table
    const columnWidths = [30, 70, 70, 80, 70, 70, '*'];
  
    // Create a document definition for pdfmake
    const docDefinition = {
      content: [
        { text: 'Users List', style: 'header', alignment: 'left' },
        {
          table: {
            headerRows: 1,
            widths: columnWidths,
            body: [
              headers,
              ...data,
            ],
          },
          alignment: 'center',
          margin: [0, 10],
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
    pdfDoc.download('Users_List.pdf');
  }
  
  

  onReset() {
    this.userForm.reset();
    this.isEditing = false;
    this.editedIndex = -1;
    this.formTitle = 'Create User';
  }

  openPreviewDialog(user: any) {
    this.dialogService.open(UserPreviewDialogComponent, {
      context: { previewData: user },
    });
  }
}
