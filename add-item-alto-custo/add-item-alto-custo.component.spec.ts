import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemAltoCustoComponent } from './add-item-alto-custo.component';

describe('AddItemAltoCustoComponent', () => {
  let component: AddItemAltoCustoComponent;
  let fixture: ComponentFixture<AddItemAltoCustoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddItemAltoCustoComponent]
    });
    fixture = TestBed.createComponent(AddItemAltoCustoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
