import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '@progress/kendo-angular-dialog';
import { Student, PaginatedData } from 'src/app/modals/students.modal';

import { DataGridComponent } from './data-grid.component';

const createFormGroup = (dataItem: Student) =>
  new FormGroup({
    id: new FormControl({ value: dataItem.id, disabled: true }),
    name: new FormControl(dataItem.name, Validators.required),
    email: new FormControl(dataItem.email, Validators.required),
    dob: new FormControl(new Date(dataItem.dob), Validators.required),
    age: new FormControl({ value: dataItem.age, disabled: true }),
  });

const paginatedData: PaginatedData = {
  items: [
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
    itemCount: 10,
    itemsPerPage: 10,
    totalItems: 39,
    totalPages: 4,
  },
};

const editEvent = {
  action: 'edit',
  dataItem: {
    age: 24,
    dob: '1998-01-05',
    email: 'Melbavincent@schl.com',
    id: 502,
    name: 'Melba Vincent',
  },
  rowIndex: 2,
  sender: {
    closeRow() {},
    editRow() {},
  },
};

describe('DataGridComponent', () => {
  let component: DataGridComponent;
  let fixture: ComponentFixture<DataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataGridComponent],
      providers: [DialogService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridComponent);
    component = fixture.componentInstance;
    component.dataSource = paginatedData;
    fixture.detectChanges();
  });

  it('@Input() value should be defined', () => {
    component;
    expect(component.dataSource).toBeTruthy();
  });

  it('Input Value ', () => {
    expect(component.skip).toEqual(1);
    expect(component.take).toEqual(10);
    expect(component.editedRowIndex).toEqual(null);
  });

  it('skip value should be 1 and take values should be 10', () => {
    expect(component.skip).toEqual(1);
    expect(component.take).toEqual(10);
    expect(component.editedRowIndex).toEqual(null);
  });

  it('creat new form group instance on edit', () => {
    const editSpy = spyOn(component, 'createFormGroup').and.returnValue(
      createFormGroup(editEvent.dataItem)
    );
    component.editHandler(editEvent);
    expect(editSpy).toHaveBeenCalledOnceWith(editEvent.dataItem);
    expect(component.formGroup).toBeTruthy();
    expect(component.editedRowIndex).toEqual(editEvent.rowIndex);
  });

  it('cancel edit', () => {
    const closeEditorSpy = spyOn(component, 'closeEditor');
    component.cancelHandler({
      sender: {
        closeRow() {},
        editRow() {},
      },
      rowIndex: 2,
    });
    expect(closeEditorSpy).toHaveBeenCalled();
  });

  it('save edited record if form value changed', () => {
    const payload = {
      formGroup: {
        value: editEvent.dataItem,
        pristine: false,
      },
      dataItem: {
        id: 502,
      },
      sender: {
        closeRow() {},
        editRow() {},
      },
      rowIndex: editEvent.rowIndex,
    };
    const saveSpy = spyOn(component.onUpdate, 'emit');
    component.saveHandler(payload);
    expect(saveSpy).toHaveBeenCalledOnceWith(payload.formGroup.value);
  });

  it('do not save edited record if form value changed', () => {
    const payload = {
      formGroup: {
        value: editEvent.dataItem,
        pristine: true,
      },
      dataItem: {
        id: 502,
      },
      sender: {
        closeRow() {},
        editRow() {},
      },
      rowIndex: editEvent.rowIndex,
    };
    const saveSpy = spyOn(component.onUpdate, 'emit');
    component.saveHandler(payload);
    expect(saveSpy).not.toHaveBeenCalledOnceWith(payload.formGroup.value);
  });

  it('should emit remove event', () => {
    const removeSpy = spyOn(component.onRemove, 'emit');
    component.removeHandler({ dataItem: { id: 502 } });
    expect(removeSpy).toHaveBeenCalledOnceWith(502);
  });

  it('should emit page changes', () => {
    const pageOptions = { skip: 2, take: 10 };
    const removeSpy = spyOn(component.onPageChange, 'emit');
    component.pageChange(pageOptions);
    expect(component.skip).toEqual(pageOptions.skip);
    const page = pageOptions.skip / 10 + 1;
    expect(removeSpy).toHaveBeenCalledOnceWith({
      limit: pageOptions.take,
      page: page,
    });
  });
});
