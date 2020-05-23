import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContractComponent } from './all-contract.component';

describe('AllContractComponent', () => {
  let component: AllContractComponent;
  let fixture: ComponentFixture<AllContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
