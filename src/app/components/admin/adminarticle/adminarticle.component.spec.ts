import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminarticleComponent } from './adminarticle.component';

describe('AdminarticleComponent', () => {
  let component: AdminarticleComponent;
  let fixture: ComponentFixture<AdminarticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminarticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
