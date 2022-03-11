import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CancelEvent, EditEvent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-listview';
import { editToolsIcon,trashIcon } from '@progress/kendo-svg-icons';
import { ListViewRecord } from 'src/app/modals/students.modal';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  studentsForm: FormGroup;
  records: Array<ListViewRecord> = [];
  private editedRowIndex: number | null;
  public listItems: Array<string> = [
    'Information Technology',
    'Bio Technology',
    'Engineering Technology',
    'Supplychain Management',
    'Data Science',
    'Mechatronics',
  ];
  public icons = { editIcon: editToolsIcon , removeIcon:trashIcon };

  constructor() {}

  ngOnInit(): void {
    this.records = [{
      name:'Jhone Doe',
      email:'JhoneDoe@gmail.com',
      dob:'1999-05-20',
      domain:'Bio Technology'
    }]
    this.studentsForm = this.createNewFormGroup();
  }

  doSomething(form:FormGroup){
    form.value.dob =  new Date(form.value.dob).toISOString().split('T')[0]
    this.records.push(form.value);
    this.records = [...this.records];
  }

  editHandler({ sender, dataItem, itemIndex }: EditEvent){
    console.log(dataItem);
    this.studentsForm = this.createNewFormGroup(dataItem)
  }

  public cancelHandler({ sender, itemIndex }: CancelEvent) {
    this.closeEditor(sender, itemIndex);
  }

  public saveHandler({ sender, itemIndex, formGroup, isNew }: SaveEvent) {
    
    sender.closeItem(itemIndex);
  }

  public removeHandler({ itemIndex }: RemoveEvent) {
    this.records.splice(itemIndex,1);
  }

  private closeEditor(sender:any, itemIndex = this.editedRowIndex) {
    sender.closeItem(itemIndex);
    this.editedRowIndex = null;
  }

  createNewFormGroup(data: ListViewRecord = {name:'',email:'',dob:'',domain:''}){
    return new FormGroup({
      name: new FormControl(data.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      email: new FormControl(data.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(4),
        Validators.maxLength(50),
      ]),
      dob: new FormControl(data.dob ? new Date(data.dob) : new Date() , [Validators.required]),
      domain: new FormControl(data.domain, [Validators.required]),
    });
  }
}
