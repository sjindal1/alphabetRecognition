import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { DrawableDirective } from './drawable.directive';

import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})


export class CanvasComponent implements OnInit {

  model: tf.Model;
  predictions: any;

  @ViewChild(DrawableDirective) canvas;

  @Output() newPrediction = new EventEmitter();

  @Output() clear = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.loadModel();
  }

  async loadModel() {
    console.log("inside load model");
    this.model = await tf.loadModel('../../assets/model.json');
    console.log("model loaded");
  }

  async predict(imageData: ImageData) {

    const pred = await tf.tidy(() => {

      // Convert the canvas pixels to 
      let img = tf.fromPixels(imageData, 1);
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');
      //let nu = tf.tensor1d([256]);
      //tf.div(img, nu);

      // Make and format the predications
      const output = this.model.predict(img) as any;

      // Save predictions on the component
      this.predictions = Array.from(output.dataSync()); 

      this.newPrediction.emit(this.predictions);
    });

  }

  clearText(clear: boolean){
    this.clear.emit(clear);
  }

}
