import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagementComponent } from './user-management.component';
import { PermissionFormComponent } from './permission-form/permission-form.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  {
  path: '',
  component: UserManagementComponent,
  children: [
    {
      path: 'permission-form',
      component:  PermissionFormComponent,
    },
    {
      path: 'role-form',
      component: RoleFormComponent,
    },
    {
      path: 'user-form',
      component: UserFormComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule { }

export const routedComponents = [
  UserManagementComponent,
  PermissionFormComponent,
  RoleFormComponent,
  UserFormComponent,
];
