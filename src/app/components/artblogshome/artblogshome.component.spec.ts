import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtblogshomeComponent } from './artblogshome.component';

describe('ArtblogshomeComponent', () => {
  let component: ArtblogshomeComponent;
  let fixture: ComponentFixture<ArtblogshomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtblogshomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtblogshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
