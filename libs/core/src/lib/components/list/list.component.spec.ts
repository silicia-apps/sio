import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SioCoreMenuComponent } from './list.component';

describe('SioCoreMenuComponent', () => {
  let component: SioCoreMenuComponent;
  let fixture: ComponentFixture<SioCoreMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SioCoreMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SioCoreMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
