import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutonsActionComponent } from './boutons-action.component';

describe('BoutonsActionComponent', () => {
  let component: BoutonsActionComponent;
  let fixture: ComponentFixture<BoutonsActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoutonsActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutonsActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
