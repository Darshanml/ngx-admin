import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-user-preview-dialog',
  templateUrl: './user-preview-dialog.component.html',
  styleUrls: ['./user-preview-dialog.component.scss']
})
export class UserPreviewDialogComponent implements OnInit {

  previewData: any;

  constructor(private dialogRef: NbDialogRef<UserPreviewDialogComponent>) { }

  ngOnInit(): void {
  }

}
