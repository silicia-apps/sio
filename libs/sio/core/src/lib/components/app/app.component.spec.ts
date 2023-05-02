import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SioCoreAppComponent } from './app.component';

describe('AppComponent', () => {
  let component: SioCoreAppComponent;
  let fixture: ComponentFixture<SioCoreAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SioCoreAppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SioCoreAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
