import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SioChatPage } from './chat.page';

describe('SioChatComponent', () => {
  let component: SioChatPage;
  let fixture: ComponentFixture<SioChatPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SioChatPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SioChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
