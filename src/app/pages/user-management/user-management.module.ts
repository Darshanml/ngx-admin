import { NgModule } from '@angular/core';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { UserManagementRoutingModule, routedComponents } from './user-management-routing.module';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTableModule,
} from '@nebular/theme';
import { RolesService } from './services/roles.service';
import { UserService } from './services/user.service';
import { PermissionsService } from './services/permissions.service';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { RolePreviewDialogComponent } from './dialogs/role-preview-dialog/role-preview-dialog.component';
import { PermissionPreviewDialogComponent } from './dialogs/permission-preview-dialog/permission-preview-dialog.component';
import { UserPreviewDialogComponent } from './dialogs/user-preview-dialog/user-preview-dialog.component';



@NgModule({
  imports: [
    ngFormsModule,
    ThemeModule,
    ReactiveFormsModule,
    HttpClientModule,NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbDatepickerModule.forRoot(), NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,UserManagementRoutingModule,
    NbTableModule,
    HttpClientModule,
  ],
  declarations: [
    ...routedComponents,
    ConfirmDialogComponent,
    RolePreviewDialogComponent,
    PermissionPreviewDialogComponent,
    UserPreviewDialogComponent,  
  ],
  providers: [RolesService,UserService,PermissionsService]
})


 

export class UserManagementModule { }
