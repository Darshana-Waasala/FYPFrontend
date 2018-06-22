import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  imageSource = '../assets/defaultImage.png';
  websocket = undefined;
  fileSelected = false;

  ngOnInit(){
    this.websocket = new WebSocket("ws://127.0.0.1:5678/");
    this.websocket.onmessage = function (event) {
      let data = JSON.parse(event.data);
      console.log('data.....',data);
    }
  }

  onChange(event){
    let reader = new FileReader();
    
    const file: File = event.target.files[0];
    
    reader.readAsDataURL(file);
    reader.onload = () =>{
      this.imageSource = reader.result;
      this.fileSelected = true;
    }
    
  }

  clearImage(){
    this.fileSelected = false;
    this.imageSource = '../assets/defaultImage.png';
  }
  
  checkForClone(){
    this.websocket = new WebSocket("ws://127.0.0.1:5678/");
    this.websocket.send(JSON.stringify({image: this.imageSource}));
  }

  /**the funcitons need to be adjusted according to the server port */
  checkForResample(){
    this.websocket = new WebSocket("ws://127.0.0.1:5678/");
    this.websocket.send(JSON.stringify({image: this.imageSource}));
  }
  checkForSplice(){
    this.websocket = new WebSocket("ws://127.0.0.1:5678/");
    this.websocket.send(JSON.stringify({image: this.imageSource}));
  }
  checkForFilter(){
    this.websocket = new WebSocket("ws://127.0.0.1:5678/");
    this.websocket.send(JSON.stringify({image: this.imageSource}));
  }
}
