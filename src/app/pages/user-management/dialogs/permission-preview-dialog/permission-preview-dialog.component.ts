import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-permission-preview-dialog',
  templateUrl: './permission-preview-dialog.component.html',
  styleUrls: ['./permission-preview-dialog.component.scss'],
})
export class PermissionPreviewDialogComponent {
  previewData: any;

  constructor(protected dialogRef: NbDialogRef<PermissionPreviewDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
