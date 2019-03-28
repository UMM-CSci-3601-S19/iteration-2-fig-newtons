import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './users/user.component';

import {RideListComponent} from "./rides/ride-list.component";
import {UserListComponent} from './users/user-list.component';

import {UserListService} from './users/user-list.service';
import {RideListService} from './rides/ride-list.service';

import {Routing} from './app.routes';
import {APP_BASE_HREF} from '@angular/common';

import {CustomModule} from './custom.module';

import {AddRideComponent} from './rides/add-ride.component';

import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {LoginComponent} from "./login/login.component";



@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    Routing,
    CustomModule,
    MatCardModule,
    MatDatepickerModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,

    UserListComponent, RideListComponent,

    UserComponent,

    AddRideComponent,
    LoginComponent

  ],
  providers: [
    UserListService,RideListService,
    {provide: APP_BASE_HREF, useValue: '/'},
  ],
  entryComponents: [
    AddRideComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
