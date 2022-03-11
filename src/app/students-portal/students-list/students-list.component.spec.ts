import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ApolloQueryResult } from '@apollo/client';
import { DialogService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { MutationResult, QueryRef } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { KendoSharedModule } from 'src/app/kendo-shared/kendo-shared.module';
import { PaginatedData, Student } from 'src/app/modals/students.modal';
import { StudentsCrudService } from '../services/students-crud.service';
import { WebsocketService } from '../services/websocket.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentsListComponent } from './students-list.component';

const studentPayload:PaginatedData = {
  items: [
    {
      age: 26,
      dob: '1995-03-22',
      email: 'Jevongoulding@schl.com',
      id: 517,
      name: 'Jevon Goulding',
    },
    {
      age: 24,
      dob: '1998-01-05',
      email: 'Melbavincent@schl.com',
      id: 502,
      name: 'Melba Vincent',
    },
  ],
  meta: {
    currentPage: 1,
    itemCount: 2,
    itemsPerPage: 10,
    totalItems: 41,
    totalPages: 5,
  },
};

const singleStudents = {
  age: 24,
  dob: '1998-01-05',
  email: 'Melbavincent@schl.com',
  id: 502,
  name: 'Melba Vincent',
};

 const returnPayload:ApolloQueryResult<{paginateStudents: PaginatedData}> ={
   data:{paginateStudents:studentPayload},
   networkStatus:7,
   loading:false
 }

 const x:Observable<ApolloQueryResult<{paginateStudents: PaginatedData}>> =  of(returnPayload);

// const qRef:QueryRef<{ paginateStudents: PaginatedData; }> = {
//   valueChanges:x,
// } 

// const stubStudentService: Pick<StudentsCrudService, keyof StudentsCrudService> =
//   {
//     getAllStudents: jasmine
//       .createSpy('getAllStudents')
//       .and.returnValue(of(studentPayload)),
//     updateStudent: jasmine.createSpy('updateStudent').and.returnValue(
//       of({
//         data: {
//           updateStudent: singleStudents,
//         },
//       })
//     ),
//     deleteStudent: jasmine.createSpy('deleteStudent').and.returnValue(
//       of({
//         data: {
//           removeStudent: true,
//         },
//       })
//     ),
//   };

// const stubWebSocketService: Pick<WebsocketService, keyof WebsocketService> = {
//   getNotified: jasmine
//     .createSpy('getAllStudents')
//     .and.returnValue(of('success')),
// };


// let stubStudentService = jasmine.createSpyObj('StudentsCrudService',['getAllStudents','updateStudent','deleteStudent']);
// let stubWebSocketService = jasmine.createSpyObj('WebsocketService',['getNotified']);

describe('StudentsListComponent', () => {
  let component: StudentsListComponent;
  let fixture: ComponentFixture<StudentsListComponent>;

  let stubStudentService: jasmine.SpyObj<StudentsCrudService>;
  let stubWebSocketService: jasmine.SpyObj<WebsocketService>;
  beforeEach(async () => {
    stubStudentService = jasmine.createSpyObj('StudentsCrudService',['getAllStudents','updateStudent','deleteStudent']);
    stubWebSocketService = jasmine.createSpyObj('WebsocketService',['getNotified']);
    await TestBed.configureTestingModule({
      declarations: [StudentsListComponent],
      imports: [KendoSharedModule,HttpClientTestingModule],
      providers: [
        { provide: StudentsCrudService, useValue: stubStudentService },
        { provide: WebsocketService, useValue: stubWebSocketService },
        NotificationService,DialogService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsListComponent);
    stubStudentService.getAllStudents.and.returnValue({ valueChanges:of(x) } as any);
    stubWebSocketService.getNotified.and.returnValue(of('success'));
    stubStudentService.updateStudent.and.returnValue(of(
      {
      data:{updateStudent:{id:1,name:'John Doe',dob:'2000-01-20',email:'Johndoe@gmial.com',age:24}},
      loading:false
    }
    ) as any)
    stubStudentService.deleteStudent.and.returnValue(of(
      {
      data:{removeStudent:true},
      loading:false
    }
    ) as any)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all paginated students', fakeAsync(() => {
    // let returnValues: PaginatedData = {
    //   items: [
    //     {
    //       age: 26,
    //       dob: '1995-03-22',
    //       email: 'Jevongoulding@schl.com',
    //       id: 517,
    //       name: 'Jevon Goulding',
    //     },
    //     {
    //       age: 24,
    //       dob: '1998-01-05',
    //       email: 'Melbavincent@schl.com',
    //       id: 502,
    //       name: 'Melba Vincent',
    //     },
    //   ],
    //   meta: {
    //     currentPage: 1,
    //     itemCount: 2,
    //     itemsPerPage: 10,
    //     totalItems: 41,
    //     totalPages: 5,
    //   },
    // };

    // let get_spy = spyOn(stubStudentService, 'getAllStudents').and.callFake(() => {
    //   return of(x) as any;
    // });

    // component.studentSubscription();
    // expect(stubStudentService.getAllStudents).toHaveBeenCalled();
    // tick(100);
    // expect(component.paginatedStudents).toEqual(studentPayload);
  }));

  it('should listen to websocket connection', () => {
    component.webSocketSubscription();
    expect(stubWebSocketService.getNotified).toHaveBeenCalled();
  });

  it('should listen to websocket connection', () => {
    component.webSocketSubscription();
    expect(stubWebSocketService.getNotified).toHaveBeenCalled();
  });

  it('should listen to websocket connection', () => {
    component.webSocketSubscription();
    expect(stubWebSocketService.getNotified).toHaveBeenCalled();
  });

  it('should call student service update method', () => {
    const student:Student = {id:1,name:'John Doe',dob:'2000-01-20',email:'Johndoe@gmial.com',age:24}
    component.updateStudent(student)
    expect(stubStudentService.updateStudent).toHaveBeenCalledOnceWith(student,{limit:10,page:1});
  });

  // it('should call student service delete method', () => {
  //   component.removeStudent(1)
  //   expect(stubStudentService.deleteStudent).toHaveBeenCalledOnceWith(1);
  // });

});
