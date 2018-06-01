import {
  Component,
  Input,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { Details, SunburstData, DeviceType } from '../../model';


@Component({
  selector: 'app-sunburst-list',
  templateUrl: './sunburst-list.component.html',
  styleUrls: ['./sunburst-list.component.scss']
})
export class SunburstListComponent implements OnChanges {
  @Input() data: Details[];
  sunburstDataList: any = {};
  types = DeviceType;
  keys = Object.keys(DeviceType);
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const sunburstDataList = {};
    if (this.data && this.data.length) {
      // now divide all the rules into storage, compute, virt, network
      this.keys.forEach(key => {
        sunburstDataList[DeviceType[key]] = { data: [], componentType: DeviceType[key]};
      });
      this.data.forEach(rule => {
        sunburstDataList[rule.device].data.push(rule);
      });
    }
    this.sunburstDataList = sunburstDataList;
  }
}
