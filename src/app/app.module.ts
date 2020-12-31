import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './components/graph/graph.component';
import { ChartsModule } from 'ng2-charts';
import { FilterComponent } from './components/filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//*poner en otro modulo*
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';




import { DatepickerComponent } from './components/datepicker/datepicker.component';





@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    FilterComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatNativeDateModule,
    MatInputModule,
    MatSliderModule,
    ReactiveFormsModule


  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,

],
  providers: [MatNativeDateModule, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
