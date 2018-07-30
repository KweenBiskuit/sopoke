import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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

  showSpinner = false;
  orderConfirm = false;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.panier = JSON.parse(localStorage.getItem('order'));
  }

  validate() {
    this.showSpinner = true;
    this.sendOrder();
    setTimeout(() => {
      this.orderConfirm = true;
    }, 3000);
  }

  sendOrder() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const requestObject = {
      user: this.user,
      order: this.panier,
      time: new Date()
    };

    this.http.post('http://jsonplaceholder.typicode.com/posts',
      requestObject)
      .subscribe(
        res => {
          console.log(res);
        }
      );
  }

}
