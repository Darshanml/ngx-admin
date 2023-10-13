import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  title: string;
  message: string;

  constructor(protected dialogRef: NbDialogRef<any>) {}

  confirm() {
    this.dialogRef.close('confirm');
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
