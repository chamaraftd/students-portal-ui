import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { StudentsPortalRoutingModule } from './students-portal-routing.module';
import { StudentsPortalComponent } from './students-portal.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { KendoSharedModule } from '../kendo-shared/kendo-shared.module';
import { StudentsListComponent } from './students-list/students-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    StudentsPortalComponent,
    DataGridComponent,
    StudentFormComponent,
    StudentsListComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StudentsPortalRoutingModule,
    KendoSharedModule,
  ],
})
export class StudentsPortalModule {}
