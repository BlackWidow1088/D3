import { Component, OnInit } from '@angular/core';
import { sunburstListData, Details } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sunburstData: Details[];
  ngOnInit(): void {
    this.sunburstData = sunburstListData;
  }
}
