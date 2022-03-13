import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { take } from 'rxjs';
import {
  PaginatedData,
  PaginationOption,
  Student,
} from 'src/app/modals/students.modal';
import {
  CREATE_STUDENT,
  DELETE_USER,
  GET_STUDENTS,
  UPDATE_STUDENT,
} from './const.gql';

@Injectable({
  providedIn: 'root',
})
export class StudentsCrudService {
  constructor(private apollo: Apollo) {}

  getAllStudents(limit: number = 10, page = 1) {
    return this.apollo.watchQuery<{ paginateStudents: PaginatedData }>({
      query: GET_STUDENTS,
      variables: {
        option: {
          limit,
          page,
        },
      },
    });
  }

  getStudent(id: number) {
    return this.apollo
      .watchQuery({
        query: GET_STUDENTS,
        variables: {
          id,
        },
      })
      .valueChanges.pipe(take(1));
  }

  createStudent(student: Student) {
    return this.apollo.mutate({
      mutation: CREATE_STUDENT,
      variables: {
        createStudentInput: student,
      },
    });
  }

  updateStudent(
    student: Partial<Student>,
    option: PaginationOption = { limit: 10, page: 1 }
  ) {
    return this.apollo.mutate<{ updateStudent: Student }>({
      mutation: UPDATE_STUDENT,
      variables: {
        updateStudentInput: student,
      },
    });
  }

  deleteStudent(id: number, option: PaginationOption = { limit: 10, page: 1 }) {
    return this.apollo.mutate<{ removeStudent: boolean }>({
      mutation: DELETE_USER,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: GET_STUDENTS,
          variables: {
            option,
          },
        },
      ],
    });
  }
}
