import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Subscription, take } from 'rxjs';
import { Student } from '../modals/students.modal';
import { StudentsCrudService } from './services/students-crud.service';

@Component({
  selector: 'app-students-portal',
  templateUrl: './students-portal.component.html',
  styleUrls: ['./students-portal.component.scss'],
})
export class StudentsPortalComponent implements OnInit, OnDestroy {
  // private querySubscription: Subscription;
  // private updateSubscription: Subscription;
  // private deleteSubscription: Subscription;
  //studentList: Array<Student> = [];
  uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

  constructor(
    private studentService: StudentsCrudService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // this.querySubscription = this.studentService
    //   .getAllStudents()
    //   .valueChanges.subscribe((responce) => {
    //     this.studentList = responce.data.students;
    //   });
  }

  // updateStudent(student: Student) {
  //   student.dob = new Date(student.dob).toISOString().split('T')[0];
  //   console.log(student);
  //   this.updateSubscription = this.studentService
  //     .updateStudent(student)
  //     .subscribe(
  //       (responce) => {
  //         if (responce.data) this.showSuccess('Update');
  //       },
  //       (error) => {
  //         this.showError('Update');
  //         throw new Error(`User Update Failed : ${error}`);
  //       }
  //     );
  // }

  // removeStudent(id: number) {
  //   this.deleteSubscription = this.studentService.deleteStudent(id).subscribe(
  //     (responce) => {
  //       if (responce.data) this.showSuccess('Delete');
  //     },
  //     (error) => {
  //       this.showError('Delete');
  //       throw new Error(`User Delete Failed : ${error}`);
  //     }
  //   );
  // }

  // public showSuccess(type: string): void {
  //   this.notificationService.show({
  //     content: `Student ${type} Success`,
  //     hideAfter: 800,
  //     position: { horizontal: 'right', vertical: 'top' },
  //     animation: { type: 'fade', duration: 300 },
  //     type: { style: 'success', icon: true },
  //   });
  // }

  // public showError(Type: string): void {
  //   this.notificationService.show({
  //     content: `${Type} Opration faild`,
  //     hideAfter: 800,
  //     position: { horizontal: 'right', vertical: 'bottom' },
  //     animation: { type: 'fade', duration: 400 },
  //     type: { style: 'error', icon: true },
  //   });
  // }

  ngOnDestroy(): void {
    // this.querySubscription.unsubscribe();
    // this.updateSubscription.unsubscribe();
    // this.deleteSubscription.unsubscribe();
  }
}
