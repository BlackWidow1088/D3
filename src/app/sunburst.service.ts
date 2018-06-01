import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Details } from './model/sunburst.model';

const sunburstDataApi = '/data';
@Injectable()
export class SunburstService {

constructor(private http: HttpClient) { }

getSunburstData(): Observable<any> {
  return this.http.get(sunburstDataApi);
}
}
