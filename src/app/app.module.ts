import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SQLite} from '@ionic-native/sqlite/ngx';

import {HttpClientModule} from '@angular/common/http';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  }, /* SQLite */],
  bootstrap: [AppComponent],
})
export class AppModule {}
