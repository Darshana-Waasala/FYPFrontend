import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { GeneralService } from './general.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  imageSource = '../assets/defaultImage.png';
  rgbSource = '../assets/rgb.png';
  headers: HttpHeaders;
  spliceSelected = false;
  fileSelected = false;
  loading = false;
  name = undefined;
  resultImage = undefined;
  websocket = undefined;

  constructor(
    private genService:GeneralService
  ){}

  ngOnInit(){
    this.websocket = new WebSocket("ws://127.0.0.1:8003/");
    this.websocket.onmessage = function (event) {
      let data = JSON.parse(event.data);
      console.log('data.....',data);
    }
    console.log('in the funciton');
    this.genService.getURL().subscribe(
      data =>{
        console.log(data);
      }
    );
  }

  onChange(event) {
    const reader = new FileReader();

    const file: File = event.target.files[0];

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSource = reader.result;
      this.fileSelected = true;
    };
  }

  clearImage() {
    this.fileSelected = false;
    this.imageSource = '../assets/defaultImage.png';
  }

  checkForClone() {

  }

  /**the funcitons need to be adjusted according to the server port */
  checkForResample() {
    this.websocket = new WebSocket('ws://127.0.0.1:8000/');
    this.websocket.send(JSON.stringify({image: this.imageSource}));
  }

}
