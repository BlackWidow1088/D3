import { Component, OnInit } from '@angular/core';
import { sunburstListData, Details } from './model';
import { SunburstService } from './sunburst.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sunburstData: Observable<Details[]>;
  constructor(private sunburstService: SunburstService) { }
  ngOnInit(): void {
    this.sunburstData = this.sunburstService.getSunburstData();
  }
}
