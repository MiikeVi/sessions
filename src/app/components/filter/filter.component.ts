import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from '../../core/services/filter/filter.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

 
  companies: Array<string> = [''];
  users: Array<string> = [''];
  

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    //this.getData();
    this.fetchTasks();
  }

  /*companies: string[];

  public fillFields(companyNames: Array<string>, username: string, interval: number){

    for ( let i = 0; i< companyNames.length ; i++){
      if (this.find(companyNames[i]) === 1){
        this.companies.push(companyNames[i]);
      }
    }
  }
*/

//Busca si la compañia existe en el array companies
  public find(nameCompany: string): number{
    let flag = 0;
    for(let i = 0; i < this.companies.length ; i++){
      let compare = nameCompany.localeCompare(this.companies[i]);
      if (compare === 0){
        flag = 0;
      }else{
        flag = 1;
      }
    }
    console.log('return del flag:');
    console.log(flag);
    return flag;
  }

  /*async getData(){
    const response = await fetch('assets/log.practica.2.csv');
    const data = await response.text();

    const rows = data.split(/\n/);
    rows.forEach(elem => {
      const row = elem.split(',');
      const companyId = row[0];
      const userId = row[1];
      const time = row[3];
      //this.users.push(userId);

//Si retorna != 0 (no existe), agrega al array
      if(!this.companies.includes(companyId)){
        this.companies.push(companyId);
      }else{
        console.log('no se agregó');
      }
      

    })
    console.log(this.companies);
  }
*/
  public fetchTasks(): void {
    this.filterService.getAllCompanies()
    .subscribe((companies: any[]) => {
      this.companies = companies;
      console.log(this.companies);
    });
  }

}
