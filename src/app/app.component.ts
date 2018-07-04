import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';


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
  websocket = undefined;
  websocketCFA = undefined;
  websocketSplice = undefined;

  ngOnInit() {
    this.websocketCFA = new WebSocket('ws://127.0.0.1:8500/');
    this.websocketSplice = new WebSocket('ws://127.0.0.1:8000/');
  }

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
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

  checkForSpliceNoise() {
    this.websocketSplice.send(JSON.stringify({image: this.imageSource}));
    const that = this;
    this.spinner.show();
    this.websocketSplice.onmessage = function (event) {
      that.spinner.hide();
      const blob: Blob = new Blob([event.data], {type: 'image/jpeg'});
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.addEventListener('load', () => {
        that.imageSource = reader.result;
      }, false);


    };
  }

  checkForSpliceCFA() {

    this.websocketCFA.send(JSON.stringify({image: this.imageSource}));
    const that = this;
    this.spinner.show();
    this.websocketCFA.onmessage = function (event) {
      that.spinner.hide();
      const blob: Blob = new Blob([event.data], {type: 'image/jpeg'});
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.addEventListener('load', () => {
        that.imageSource = reader.result;
      }, false);

    };
  }

  checkForFilter() {

  }

}
