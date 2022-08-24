import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnChanges {

  @Input() data: any;
  percent: number = 0;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    let total = (this.data.male + this.data.female);  
    this.percent = (total % 10 === 0) ? 100 : (total % 10) *10;
  }

}
