import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SioCorePageComponent } from './page.component';

describe('sioPageCoreComponent', () => {
  let component: SioCorePageComponent;
  let fixture: ComponentFixture<SioCorePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SioCorePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SioCorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
