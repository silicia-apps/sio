import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SioCoreMenuItemComponent } from './menu-item.component';

describe('SioCoreMenuItemComponent', () => {
  let component: SioCoreMenuItemComponent;
  let fixture: ComponentFixture<SioCoreMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SioCoreMenuItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SioCoreMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
