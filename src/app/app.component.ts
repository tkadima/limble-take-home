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
    const textarea = this.textarea.nativeElement;
    const currentText = textarea.value;
    const cursorPosition = textarea.selectionStart;
    
    this.newComment = currentText; 
    if (newValue.includes('@')) {
      this.showUserDropdown = true;
      const tagIndex = newValue.lastIndexOf('@'); 
      const tagged = newValue.slice(tagIndex + 1, cursorPosition); 
      this.users = this.getMatchingUsers(tagged);
      if (this.users.length === 0)  this.showUserDropdown = false; 
    }
    else  {
      this.showUserDropdown = false; 
    }
  }

  getMatchingUsers(taggedUser: string): User[] {
    return users.filter(user => user.name.toLowerCase().includes(taggedUser.toLowerCase())); 
  }

  onSelect(taggedUser: User): void {
    const textarea = this.textarea.nativeElement;
    const currentText = textarea.value;
    const cursorPosition = textarea.selectionStart;
    
    let lastAtSymbolIndex = currentText.lastIndexOf('@', cursorPosition - 1);
  
    if (lastAtSymbolIndex === -1) {
      lastAtSymbolIndex = 0;
    } else {
      lastAtSymbolIndex++;
    }
  
    const textBeforeAtSymbol = currentText.substring(0, lastAtSymbolIndex);
    const textAfterAtSymbol = currentText.substring(cursorPosition);
  
    const newText = `${textBeforeAtSymbol}${taggedUser.name}${textAfterAtSymbol}`;
    textarea.value = newText;
    this.newComment = newText;
  
    this.newTags.push(taggedUser);
  
    this.users = users;
    this.showUserDropdown = false;
  }
  
  
  onSubmit(): void {
    if (this.newComment !== "") {
    this.comments.push(this.newComment);
    this.taskTags.push(...this.newTags);
    console.log('new Tasks', this.newTags); 
    alert(`Tagged: ${this.newTags.map(user => user.name).join(', ')}`)
    this.newComment = '';
    this.newTags = []
    }
  }

  formatComment(comment: string): string {
    let formattedComment = comment;
    this.taskTags.forEach(user => {
      const regex = new RegExp(`@${user.name}`, 'gi');
      formattedComment = formattedComment.replace(regex, `<strong>@${user.name}</strong>`);
    });
    return formattedComment;
  }
  
  
}
