import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SunburstListComponent } from './shared/sunburst-list/sunburst-list.component';
import { SunburstComponent } from './shared/sunburst/sunburst.component';


@NgModule({
  declarations: [
    AppComponent,
    SunburstListComponent,
    SunburstComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
