import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-offer',
  templateUrl: './special-offer.component.html',
  styleUrls: ['./special-offer.component.scss']
})
export class SpecialOfferComponent implements OnInit {

  @Input() offerProduct : any;

  constructor() { }

  ngOnInit(): void {
      
  }

}
