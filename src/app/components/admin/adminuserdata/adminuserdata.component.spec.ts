import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuserdataComponent } from './adminuserdata.component';

describe('AdminuserdataComponent', () => {
  let component: AdminuserdataComponent;
  let fixture: ComponentFixture<AdminuserdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminuserdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminuserdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
