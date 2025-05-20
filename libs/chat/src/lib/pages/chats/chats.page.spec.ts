import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SioChatListPage} from './chat-list.page';

describe('SioChatComponent', () => {
  let component: SioChatListPage;
  let fixture: ComponentFixture<SioChatListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SioChatListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SioChatListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
