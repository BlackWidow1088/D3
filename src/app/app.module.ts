import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SunburstListComponent } from './shared/sunburst-list/sunburst-list.component';
import { SunburstComponent } from './shared/sunburst/sunburst.component';
import { SunburstService } from './sunburst.service';


@NgModule({
  declarations: [
    AppComponent,
    SunburstListComponent,
    SunburstComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [SunburstService],
  bootstrap: [AppComponent]
})
export class AppModule { }
