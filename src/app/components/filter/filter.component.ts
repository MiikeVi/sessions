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
  warn: string;
  info: string;
 
  companies: Array<string> = [''];
  users: Array<string> = [''];
  dates: Array<string> = [''];
  sessions: Array<string> = [];
  labels: Array<string> = [];
  
  constructor(private filterService: FilterService) { }

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


  public FilteredRows(): void {
    this.filterService.getRowsFiltered(this.form.value.company, this.form.value.user, this.form.value.interval, this.splitDate(this.form.value.startDate), this.splitDate(this.form.value.endDate)) //manda por parametro los valores obtenidos de los filtros
    .subscribe((data: any[]) => {
      if(data !== null){
        data.forEach(element => {
          this.sessions.push(element.sesiones);
          this.labels.push(element.firstDate.split("T")[0].concat(' - ', element.lastDate.split("T")[0]));
        }); //array sessions debe ser pasado a graph.component.ts
        this.sendArray(this.sessions, this.labels);
        this.info = "Data filtrada, actualizar gráfico";
      }else{
        this.warn = "No existen sesiones para esa combinación de usuario-compañia";
      }
      
      console.log("Desde filteredrows");
      console.log(this.form.value.company);
      console.log(this.form.value.user);
      console.log(this.form.value.interval);
      console.log(this.splitDate(this.form.value.startDate));
      console.log(this.splitDate(this.form.value.endDate));
      console.log(this.sessions);
      console.log(this.labels); 
    })
  }


  splitDate(date){
    var stringDate = date.toISOString(),
        dateSplit  = stringDate.split("T"),
        newDate = dateSplit[0];

    return newDate;
}

  private buildForm() {
    this.form = new FormGroup({
      company: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      interval: new FormControl('', [Validators.required]),
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

  sendArray(sessions, labels) {
    this.filterService.setSessions(sessions);
    this.filterService.setLabels(labels);
  }

  /*public filter(){
    this.childEvent.emit(array);
  }*/
}
