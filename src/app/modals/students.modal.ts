export interface Student {
  id?: number;
  name: string;
  email: string;
  dob: string;
  age?: number;
}

export interface PaginatedData {
  items: Student[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  totalItems:number
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginationOption {
    limit:number,
    page:number
} 

export interface ListViewRecord {
  name: string; 
  email:string;
  dob:string; 
  domain:string 
}