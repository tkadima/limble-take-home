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
  comments: string[] = ['This task was assigned to @Daryl Babb', 'Waiting on Parts']; 
  newComment: string = '';
  users: User[] = users
  showUserDropdown: boolean = false; 
  newTags: User[] = [];
  taskTags: User[] = [{'userID': 0, 'name': 'Daryl Babb'}];

  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  setUpdateComment(newValue: string){
    this.newComment = newValue; 
    if (newValue.includes('@')) {
      this.showUserDropdown = true;
      const tagIndex = newValue.lastIndexOf('@'); 
      const tagged = newValue.slice(tagIndex + 1); 
      this.users = this.getMatchingUsers(tagged);
    }
    if (!newValue.includes('@')) {
      this.showUserDropdown = false; 
    }


  }

  getMatchingUsers(taggedUser: string): User[] {
    return users.filter(user => user.name.toLowerCase().includes(taggedUser.toLowerCase())); 
  }

  onSelect(user:User): void {
    const textarea = this.textarea.nativeElement;
    const currentText = textarea.value;
    const cursorPosition = textarea.selectionStart;
    // todo fix so it completes when user already types some
    const newText = currentText.slice(0, cursorPosition) + user.name + currentText.slice(cursorPosition);
    textarea.value = newText;
    this.newComment = newText;

    this.newTags.push(user); 
    // reset 
    this.users = users; 
    this.showUserDropdown = false; 
  }

  onSubmit(): void {
    this.comments.push(this.newComment);
    alert(`Tagged: ${this.newTags.map(user => user.name).join(', ')}`)
    this.newComment = '';
    this.newTags = []
  }

  formatComment(comment: string): string {
    const formattedComment = comment.replace(/@([\w\s]+)/g, (match, username) => {
      const matchedUser = this.taskTags.find(user => user.name.toLowerCase() === username.trim().toLowerCase());
      if (matchedUser) {
        return `<strong>@${matchedUser.name}</strong>`;
      } else {
        return match;
      }
    });
    return formattedComment;
  }  
  
}
