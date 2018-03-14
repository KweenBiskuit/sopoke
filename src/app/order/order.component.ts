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

  validateOrder = false;


  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.panier = JSON.parse(localStorage.getItem('order'));
  }

  validate() {
    this.validateOrder = true;
    this.sendOrder().subscribe(value => {
      console.log('after commande');
    });
  }

  sendOrder(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://adresseduserver/api', { ...this.panier, ...this.user }, httpOptions);
  }

}
