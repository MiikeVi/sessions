import { Component, ErrorHandler, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { FilterService } from '../../core/services/filter/filter.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() public childEvent = new EventEmitter();

  form: FormGroup;
 
  companies: Array<string> = [''];
  users: Array<string> = [''];
  dates: Array<string> = [''];
  
  constructor(private filterService: FilterService) {

   }

  ngOnInit(): void {
    this.fetchFilterData();
    this.buildForm();
    
  }

  public fetchFilterData(): void {
    this.filterService.getAllCompanies()
    .subscribe((data: any[]) => {
      let datos = [];
      this.companies = data[0];
      this.users = data[1];
      datos = data[2];
      for(let i=0 ; i<datos.length ; i++){
        this.dateHourSplit(datos[i]);
      }
      console.log(this.companies);
      console.log(this.users);
      console.log(this.dates);
    });
  }

  public dateHourSplit(date: string){
    let f = date.split('T');
    this.dates.push(f[0]);
  }


 /* public FilteredRows(): void {
    this.filterService.getRowsFiltered(this.form.company, this.form.user, this.form.startDate, this.form.endDate) //manda por parametro los valores obtenidos de los filtros
    .subscribe((data: any[]) => {
      this.sessions.push(); //array sessions debe ser pasado a graph.component.ts
    })

  }*/

  private buildForm() {
    this.form = new FormGroup({
      company: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),

    });

    /*this.form.valueChanges
    .subscribe(value => {
      console.log(value);
    });*/
  }

  save(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    console.log(value);
  }

  /*public filter(){
    this.childEvent.emit(array);
  }*/


}
