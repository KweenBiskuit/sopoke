import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
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

  constructor(private router: Router, private http: HttpClient) {}

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

    this.http
      .post('http://localhost:3333/pokebowls', requestObject)
      .pipe(catchError(this.handleError))
      .subscribe(res => {
        console.log(res);
      });
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return ErrorObservable.create('Something bad happened; please try again later.');
  }
}
