import { gql } from 'apollo-angular';

export const GET_STUDENTS = gql`
  query ($option:PaginateOptions!) {
    paginateStudents(option:$option) {
      items {
        id
        email
        name
        dob
        age
      }
      meta {
        totalItems
        itemCount
        itemsPerPage
        totalPages
        currentPage
      }
    }
  }
`;

export const GET_STUDENT = gql`
  query ($id: Int!) {
    student(id: $id) {
      id
      name
      email
      dob
      age
    }
  }
`;

export const CREATE_STUDENT = gql`
  mutation createStudent($createStudentInput: [CreateStudentInput!]!) {
    createStudent(createStudentInput: $createStudentInput) {
      id
      name
      email
      dob
      age
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation updateStudent($updateStudentInput: UpdateStudentInput!) {
    updateStudent(updateStudentInput: $updateStudentInput) {
      id
      name
      email
      dob
      age
    }
  }
`;

export const DELETE_USER = gql`
  mutation removeStudent($id: Int!) {
    removeStudent(id: $id)
  }
`;
