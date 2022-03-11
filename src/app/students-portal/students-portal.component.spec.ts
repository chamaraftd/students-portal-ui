import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsPortalComponent } from './students-portal.component';

describe('StudentsPortalComponent', () => {
  let component: StudentsPortalComponent;
  let fixture: ComponentFixture<StudentsPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
