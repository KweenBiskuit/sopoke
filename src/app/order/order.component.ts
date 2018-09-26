import { ToasterService } from 'angular2-toaster';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

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
  errorsHappen = false;

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.panier = JSON.parse(localStorage.getItem('order'));
  }

  validate() {
    this.showSpinner = true;
    setTimeout(() => {
      this.sendOrder();
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
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe(res => {
        this.showSpinner = false;
        this.orderConfirm = true;
        console.log(res);
      });
  }

  handleError(error: HttpErrorResponse) {
    this.ngZone.run(() => {
      this.errorsHappen = true;
      this.showSpinner = false;
    });
    this.toasterService.pop('warning', 'Erreur !', error.error.error);
    return ErrorObservable.create('Something bad happened; please try again later.');
  }
}
