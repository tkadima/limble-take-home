import { Component, ElementRef, ViewChild } from '@angular/core';


interface User {
  userID: number;
  name: string;
}
const users: User[] = [
  {'userID' : 1, 'name' : 'Kevin'},
  {'userID' : 2, 'name' : 'Jeff'},
  {'userID' : 3, 'name' : 'Bryan'},
  {'userID' : 4, 'name' : 'Gabbey'},
]; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  comments: string[] = ['Waiting on Parts']; 
  newComment: string = '';
  users: User[] = users
  showUserDropdown: boolean = false; 
  tags: User[] = [];

  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  setUpdateComment(newValue: string){
    this.newComment = newValue; 
    if (newValue.includes('@')) {
      this.showUserDropdown = true;
      const tagIndex = newValue.lastIndexOf('@'); 
      const tagged = newValue.slice(tagIndex + 1); 
      this.users = this.getMatchingUsers(tagged);
    }
  }

  getMatchingUsers(taggedUser: string): User[] {
    return users.filter(user => user.name.includes(taggedUser)); 
  }

  onSelect(user:User): void {
    const textarea = this.textarea.nativeElement;
    const currentText = textarea.value;
    const cursorPosition = textarea.selectionStart;
    // todo fix so it completes when user already types some
    const newText = currentText.slice(0, cursorPosition) + user.name + currentText.slice(cursorPosition);
    textarea.value = newText;
    this.newComment = newText;

    this.tags.push(user); 
    // reset 
    this.users = users; 
    this.showUserDropdown = false; 
  }

  onSubmit(): void {
    this.comments.push(this.newComment);
    alert(`Tagged: ${this.tags.map(user => user.name).join(', ')}`)
    this.newComment = '';
    this.tags = []
  }

  formatComment(comment: string): string{
    return comment.replace(/@(\w+)/g, '<strong>@$1</strong>');
  }
}
