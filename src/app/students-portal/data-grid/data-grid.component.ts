import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditEvent } from '@progress/kendo-angular-grid';
import { PagerPosition, PagerType } from '@progress/kendo-angular-grid/dist/es2015/pager/pager-settings';
import { PaginatedData, Student } from 'src/app/modals/students.modal';



@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit {
  @Input() dataSource: PaginatedData;
  @Output() onRemove = new EventEmitter<number>();
  @Output() onUpdate = new EventEmitter<Student>();
  @Output() onPageChange = new EventEmitter<{page:number,limit:number}>();
  public formGroup: FormGroup | null = null;
  public editedRowIndex: number | null = null;
  public type:PagerType = "numeric";
  public info = true;
  public previousNext = true;
  public position:PagerPosition = "bottom";
  public buttonCount = 2;
  public skip = 1;
  public take = 10;

  createFormGroup = (dataItem: Student) =>
  new FormGroup({
    id: new FormControl({value:dataItem.id,disabled:true}),
    name: new FormControl(dataItem.name, Validators.required),
    email: new FormControl(dataItem.email, Validators.required),
    dob: new FormControl(new Date(dataItem.dob), Validators.required),
    age: new FormControl({value:dataItem.age,disabled:true} ),
  });

  constructor(
  ) {}

  ngOnInit(): void {}

  editHandler(event:any) {
    this.closeEditor(event.sender);
    this.formGroup = this.createFormGroup(event.dataItem);
    this.editedRowIndex = event.rowIndex;
    event.sender.editRow(this.editedRowIndex, this.formGroup);
  }

  cancelHandler(event: any) {
    this.closeEditor(event.sender, event.rowIndex);
  }
  

  saveHandler(event: any) {
    if(!event.formGroup.pristine){
      event.formGroup.value['id'] = event.dataItem.id;
      this.onUpdate.emit(event.formGroup.value)
    }
    event.sender.closeRow(event.rowIndex);
  }

  removeHandler(event: any) {
    const id: number = event.dataItem.id;
    this.onRemove.emit(id);
  }

  pageChange(pageChangeEvent:{skip:number,take:number}){
    this.skip = pageChangeEvent.skip;
    const page = (pageChangeEvent.skip/10) + 1;
    this.onPageChange.emit({page:page,limit:10})
  }

  closeEditor(grid: any, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = null;
    this.formGroup = null;
  }
}
