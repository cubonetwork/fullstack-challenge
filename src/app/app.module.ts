import { reducers } from './employees/redux';
import { EmployeeEffects } from './employees/redux/employee.effect';
import { EmployeeService } from './employees/employee.service';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    StoreModule.provideStore(reducers),
    EffectsModule.run(EmployeeEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
