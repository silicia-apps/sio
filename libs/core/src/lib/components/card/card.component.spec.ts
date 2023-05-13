import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SioCoreCardComponent } from './card.component';

describe('SioCoreCardComponent', () => {
  let component: SioCoreCardComponent;
  let fixture: ComponentFixture<SioCoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SioCoreCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SioCoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
