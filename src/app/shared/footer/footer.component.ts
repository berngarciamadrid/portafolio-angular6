import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  this_year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
