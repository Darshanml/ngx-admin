import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-preview-dialog',
  templateUrl: './role-preview-dialog.component.html',
  styleUrls: ['./role-preview-dialog.component.scss']
})
export class RolePreviewDialogComponent implements OnInit {

  previewData: any;

  constructor(protected dialogRef: NbDialogRef<RolePreviewDialogComponent>) { }

  ngOnInit(): void {
  }

  

}
