import { Component } from '@angular/core';
import { openMap } from './Map';
import * as ol from 'ol';

let omap; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  openMap = new openMap();
  ngOnInit() {
    this.openMap.start();
  }

  zoomIn() {
    this.openMap.zoomIn();
  }
  zoomOut() {
    this.openMap.zoomOut();
  }
  zoomtoGPS() {
    let _this = this;
    navigator.geolocation.getCurrentPosition(function (location) {
      _this.openMap.zoomtoGPS(location.coords.latitude, location.coords.longitude);
    });
  }
  setBaseMap(layer_code) {
    this.openMap.setBaseMap(layer_code);
  }
}

