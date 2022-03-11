import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { FileInfo, FileRestrictions, SuccessEvent } from '@progress/kendo-angular-upload';
import { Subscription } from 'rxjs/internal/Subscription';
import { PaginatedData, PaginationOption, Student } from 'src/app/modals/students.modal';
import { environment } from 'src/environments/environment';
import { Messages } from 'src/app/modals/enums/messages.enum';
import { StudentsCrudService } from '../services/students-crud.service';
import { WebsocketService } from '../services/websocket.service';
import { QueryRef } from 'apollo-angular';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit {
  private initSubscription: Subscription = new Subscription();
  private updateSubscription: Subscription;
  private deleteSubscription: Subscription;
  public userFile: Array<FileInfo>;
  public limit:number = 10;
  public page:number = 1;
  public allowedExtension: FileRestrictions = {
    allowedExtensions: ['xlsx'],
  };
  studentQueryRef: QueryRef<any>;
  paginatedStudents: PaginatedData;
  uploadSaveUrl = environment.fileuploadMicroservice;

  constructor(
    private studentService: StudentsCrudService,
    private notificationService: NotificationService,
    private webSocketNotifier: WebsocketService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.studentSubscription();
    this.webSocketSubscription();
  }

  studentSubscription() {
    this.studentQueryRef =  this.studentService
    .getAllStudents()
    this.initSubscription.add(
      this.studentQueryRef
        .valueChanges.subscribe((response) => {
          this.paginatedStudents = {...response.data.paginateStudents}
        })
    );
  }

  webSocketSubscription() {
    this.initSubscription.add(
      this.webSocketNotifier.getNotified().subscribe((notification: string) => {
        if (notification.toLowerCase() === 'success'){
          this.studentQueryRef.refetch({option:{limit:10,page:1}});
          this.showSuccess(Messages.FILE_PROCESSING_SUCCESS);
        }
        else if (notification.toLowerCase() === 'failed')
          this.showError(Messages.FILE_PROCESSING_FAILED);
      })
    );
  }

  pageChange(paginateOptions:PaginationOption){
    this.limit = paginateOptions.limit;
    this.page = paginateOptions.page
    this.studentQueryRef.refetch({option:paginateOptions})
  }

  updateStudent(student: Student) {
    student.dob = new Date(student.dob).toISOString().split('T')[0];
    this.updateSubscription = this.studentService
      .updateStudent(student,{limit:this.limit,page:this.page})
      .subscribe(
        (response) => {
          if (response.data) this.showSuccess(Messages.UPDATE_SUCCESS_MESSAGE);
        },
        (error) => {
          this.showError(Messages.UPDATE_ERROR_MESSAGE);
          throw new Error(`User Update Failed : ${error}`);
        }
      );
  }

  removeStudent(id: number) {
    const dialog: DialogRef = this.dialogService.open({
      title: 'Please confirm',
      content: `Are you sure you want to delete ${id} ?`,
      actions: [{ text: 'No' }, { text: 'Yes', themeColor: 'primary' }],
      width: 450,
      height: 200,
      minWidth: 250,
    });

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
      } else {
        if (result.text.toLocaleLowerCase() === 'yes') {
          this.removeStudentSubscription(id)
        }
      }
    });
  }

  removeStudentSubscription(id:number){
    this.deleteSubscription = this.studentService.deleteStudent(id,{limit:this.limit,page:this.page}).subscribe(
      (response) => {
        if (response.data?.removeStudent) this.showSuccess(Messages.DELETE_SUCCESS_MESSAGE);
        else this.showError(Messages.DELETE_ERRORS_MESSAGE);
      },
      (error) => {
        throw new Error(`User Delete Failed : ${error}`);
      }
    );
  }

  public showSuccess(message: string): void {
    this.notificationService.show({
      content: message,
      hideAfter: 1000,
      position: { horizontal: 'right', vertical: 'top' },
      animation: { type: 'fade', duration: 600 },
      type: { style: 'success', icon: true },
    });
  }

  public showError(message: string): void {
    this.notificationService.show({
      content: message,
      hideAfter: 10000,
      position: { horizontal: 'right', vertical: 'top' },
      animation: { type: 'fade', duration: 600 },
      type: { style: 'error', icon: true },
    });
  }

  // public showConfirmation(id?: number) {
  //   const dialog: DialogRef = this.dialogService.open({
  //     title: 'Please confirm',
  //     content: 'Are you sure?',
  //     actions: [{ text: 'No' }, { text: 'Yes', themeColor: 'primary' }],
  //     width: 450,
  //     height: 200,
  //     minWidth: 250,
  //   });

  //   dialog.result.subscribe((result) => {
  //     if (result instanceof DialogCloseResult) {
  //     } else {
  //       if (result.text.toLocaleLowerCase() === 'yes') {
  //         //this.removeStudent(id)
  //       }
  //     }
  //   });
  // }

  ngOnDestroy(): void {
    this.initSubscription && this.initSubscription.unsubscribe();
    this.updateSubscription && this.updateSubscription.unsubscribe();
    this.deleteSubscription && this.deleteSubscription.unsubscribe();
  }
}
