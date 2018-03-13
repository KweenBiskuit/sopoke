import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  panier = {
    total: 0,
    items: []
  };

  user = {
    firstname: '',
    lastname: '',
    address: '',
    city: ''
  };

  validateOrder = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.panier = JSON.parse(localStorage.getItem('order'));
  }

  validate() {
    if (this.panier.total > 30) {
      this.validateOrder = true;
    }
  }

}
