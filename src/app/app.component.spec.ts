import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show user dropdown when "@" is typed', () => {
    const textarea = fixture.nativeElement.querySelector('.comment__new-textarea');
    textarea.value = 'Testing @';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.showUserDropdown).toBe(true);
  });

  it('should select a user from dropdown and update comment box', () => {
    const textarea = fixture.nativeElement.querySelector('.comment__new-textarea');
    textarea.value = 'Testing @';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    const userOption = fixture.nativeElement.querySelector('.dropdown-content li');
    userOption.click();
    fixture.detectChanges();

    expect(textarea.value).toContain(component.users[0].name);
  });

  it('should submit a comment and update comments array', () => {
    const initialCommentsLength = component.comments.length;
    component.newComment = 'New Comment';
    component.onSubmit();
    expect(component.comments.length).toBe(initialCommentsLength + 1);
    expect(component.comments[initialCommentsLength]).toBe('New Comment');
  });

  it('should format comment when user is tagged', () => {
    const taskTags = [{ 'userID': 5, 'name': 'User'}]
    component.taskTags = taskTags;
    const taggedComment = component.formatComment('Test comment with @User');
    expect(taggedComment).toBe('Test comment with <strong>@User</strong>');
  });
});
