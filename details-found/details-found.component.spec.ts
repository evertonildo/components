import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFoundComponent } from './details-found.component';

describe('DetailsFoundComponent', () => {
  let component: DetailsFoundComponent;
  let fixture: ComponentFixture<DetailsFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
