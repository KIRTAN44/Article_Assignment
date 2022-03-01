import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Initialpage2Component } from './initialpage2.component';

describe('Initialpage2Component', () => {
  let component: Initialpage2Component;
  let fixture: ComponentFixture<Initialpage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Initialpage2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Initialpage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
