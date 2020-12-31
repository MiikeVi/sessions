import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) { }

  getAllCompanies(): any {
    
    return this.http.get(`http://localhost:3000/calls`);
  }

  getRowsFiltered(company, user, date1, date2): any {
    return this.http.get(`http://localhost:3000/calls?company=${company}?user=${user}?firstDate=${date1}?lastDate=${date2}`);
  }
//test
  getAllData(): any {
    return this.http.get(`http://localhost:3000/filt`);
  }
}


