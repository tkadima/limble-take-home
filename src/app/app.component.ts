import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  comments: string[] = []; 
  newComment: string = '';

  setUpdateComment(newValue: string){
    console.log('new', newValue); 
    if (newValue.includes('@')){
      console.log('new tag started'); 
    }
  }
}
