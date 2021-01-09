import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public sessions: Array<any>;
  public labels: Array<any>;

  constructor(private http: HttpClient) { }

  getAllCompanies(): any {
    
    return this.http.get(`http://localhost:3000/calls`);
  }

  getRowsFiltered(company, user, interval, date1, date2): any {
    return this.http.get(`http://localhost:3000/filt?company=${company}&user=${user}&interval=${interval}&startDate=${date1}&endDate=${date2}`);
  }
//test
  getAllData(): any {
    return this.http.get(`http://localhost:3000/filt`);
  }

//Getters & Setters
  setSessions(array: any) {
    this.sessions = array;
  }

  getSessions() {
    return this.sessions;
  }

  setLabels(array: any) {
    this.labels = array;
  }

  getLabels() {
    return this.labels;
  }

}


