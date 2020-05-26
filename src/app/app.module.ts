import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';  
import { ShareService } from './share.service';

import { ItemsComponent }      from './items/items.component';
import { RentalsComponent } from './rentals/rentals.component';

import { HttpClientModule }    from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { MyItemsComponent } from './my-items/my-items.component';
import { LoggingComponent } from './logging/logging.component';
import { EditWindowComponent } from './my-items/edit-window/edit-window.component';

@NgModule({
  declarations: [
    AppComponent,
    RentalsComponent,
    ItemsComponent,
    MessagesComponent,
    MyItemsComponent,
    LoggingComponent,
    EditWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
