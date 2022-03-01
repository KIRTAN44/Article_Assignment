import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Initialpage3Component } from './initialpage3.component';

describe('Initialpage3Component', () => {
  let component: Initialpage3Component;
  let fixture: ComponentFixture<Initialpage3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Initialpage3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Initialpage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
