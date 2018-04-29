import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  predictionPercentage: any;
  @Input() predictions:any;

  @Input() clearText:boolean;

  prediction: string;

  defaultText:string = "Write an Alphabet or digit in the white box and I'll try and predict what you've written";

  mappings = {0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    10: 65,
    11: 66,
    12: 67,
    13: 68,
    14: 69,
    15: 70,
    16: 71,
    17: 72,
    18: 73,
    19: 74,
    20: 75,
    21: 76,
    22: 77,
    23: 78,
    24: 79,
    25: 80,
    26: 81,
    27: 82,
    28: 83,
    29: 84,
    30: 85,
    31: 86,
    32: 87,
    33: 88,
    34: 89,
    35: 90,
    36: 97,
    37: 98,
    38: 100,
    39: 101,
    40: 102,
    41: 103,
    42: 104,
    43: 110,
    44: 113,
    45: 114,
    46: 116};

  constructor() { }

  ngOnInit() {
    this.clearText = true;
  }

  ngOnChanges() {
    if(this.predictions == null) this.clearText = true;
    if(this.predictions){
      let maxIndex = this.indexOfMax(this.predictions);
      this.clearText = false;
      this.prediction = String.fromCharCode(this.mappings[maxIndex]);
      this.predictionPercentage = this.predictions[maxIndex] * 100;
    }
  }

  indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
  }

  

}
