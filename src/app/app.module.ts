import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { SpinWheelComponent } from './spin-wheel/spin-wheel.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinWheelComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
