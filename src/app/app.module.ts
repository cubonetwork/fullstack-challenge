import { EmployeeEffects } from './redux/employee/employee.effect';
import { EmployeeCollectionEffects } from './redux/employeeCollection/employeeCollection.effect';
import { reducer } from './redux';
import { EmployeeService } from './employees/employee.service';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule,
    routing,
    StoreModule.provideStore(reducer),
    EffectsModule.run(EmployeeCollectionEffects),
    EffectsModule.run(EmployeeEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
