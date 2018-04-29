import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  predictions:any;
  clear:boolean;
  

  setPredictions(predictions:any){
    this.predictions = predictions;
  }

  clearPrevPredic(clear){
    console.log("inside home" + this.clear);
    this.clear = clear;
    this.predictions = null;
  }
}
