import { Component, OnInit } from '@angular/core';
import { GeneralService } from './general.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  imageSource = './assets/defaultImage.png';
  websocket = undefined;
  fileSelected = false;
  loading = false;
  name = undefined;
  resultImage = undefined;

  constructor(
    private genService:GeneralService,
    private domSanitizer: DomSanitizer
  ){}

  ngOnInit(){
    /*this.websocket = new WebSocket("ws://127.0.0.1:5678/");
    this.websocket.onmessage = function (event) {
      let data = JSON.parse(event.data);
      console.log('data.....',data);
    }*/
  }

  onChange(event){
    let reader = new FileReader();
    
    const file: File = event.target.files[0];
    console.log(event);
    
    reader.readAsDataURL(file);
    reader.onload = () =>{
      console.log('reader.....',reader);
      this.imageSource = reader.result;
      // console.log('check the image source..',this.imageSource);
      console.log('reader splitted.....',reader.result.split(';')[0].split('/')[1]);
      this.name = event.target.files[0].name
      this.fileSelected = true;
    }
    
  }

  clearImage(){
    this.fileSelected = false;
    this.imageSource = './assets/defaultImage.png';
    this.resultImage = undefined;
  }

  /**the funcitons need to be adjusted according to the server port */  
  checkForClone(){
    this.loading = true;
    console.log('htting the function');
    // this.websocket.send(JSON.stringify({image: this.imageSource}));
    var data = {
      'data':this.imageSource.split(',')[1], // get the image data after , sign
      'parameters':this.imageSource.split(',')[0] + ',', // get parameters eg:data:image/jpeg;base64, 
      'name':this.name, // get the file saving extension eg:jpg,png,...
    }
    this.genService.postAnyReturn('http://localhost:5000/test',data).subscribe(
      response=>{
        console.log('got the result:',response);
        this.resultImage = this.domSanitizer.bypassSecurityTrustUrl(response.data);
        this.loading = false;
      }
    );
  }

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
