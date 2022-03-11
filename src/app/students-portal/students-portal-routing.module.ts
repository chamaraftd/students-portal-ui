import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsPortalComponent } from './students-portal.component';

const routes: Routes = [{ path: 'students',component: StudentsPortalComponent,
children:[
  {path:'', component:StudentsListComponent},
  {path:'demo', component:StudentFormComponent}
] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsPortalRoutingModule {}
