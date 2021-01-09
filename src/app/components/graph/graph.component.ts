import { Component, Input, OnInit, Output, OnChanges, SimpleChanges, SimpleChange, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { FilterService } from '../../core/services/filter/filter.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})

export class GraphComponent implements OnInit {

  @Input() public parentData;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  //chart: any;
 
  firstDate: string;
  lastDate: string;
  allData = [];
  dates = ['Enero', 
          'Febrero', 
          'Marzo', 
          'Abril', 
          'Mayo', 
          'Junio'];
  sessions = [5];

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
  }

  public lineChartData: ChartDataSets[] = [
    { data: this.sessions,
      label: 'Sesiones',
      yAxisID: 'y-axis-1' 
    }];

  public lineChartLabels: Label[] = this.dates

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-1',
          position: 'left',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public fetchAllData(){
    return this.filterService.getSessions();
  }

  public btnUpdate(){
    let arr = this.filterService.getSessions();
    let labels = this.filterService.getLabels();
    this.sessions.length= 0;
    this.dates.length = 0;

      for(let i = 0; i<arr.length ; i++){
        this.sessions.push(arr[i]);
        this.dates.push(labels[i]);
      }
      
      this.chart.chart.update();
  }
}
