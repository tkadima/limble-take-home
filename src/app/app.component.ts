import { Component } from '@angular/core';


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


  comments: string[] = []; 
  newComment: string = '';
  topUser: User|null = null; 
  users: User[] = users
  selectedUser: User|null = null; 

  setUpdateComment(newValue: string){
    this.newComment = newValue; 
    if (newValue.includes('@')){
      const tagIndex = newValue.indexOf('@'); 
      const tagged = newValue.slice(tagIndex + 1); 
      this.getMatchingUsers(tagged)
    }
  }

  getMatchingUsers(taggedUser: string) {
    this.users = users.filter(user => user.name.includes(taggedUser)); 
    this.topUser = this.users[0]; 
  }
}
