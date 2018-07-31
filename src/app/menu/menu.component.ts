import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  // FIXME : high ! ajouter au panier ne fonctionne pas

  items = [
    { id: 0, title: 'Saumon & concombre', price: 10 },
    { id: 1, title: 'Thon tropical spicy', price: 12 },
    { id: 2, title: 'Saumon Fruit de la passion', price: 9 },
    { id: 3, title: 'Edamame & gingembre', price: 8 }
  ];

  panier = {
    total: 0,
    items: []
  };

  commandeValide = new Observable<boolean>();

  constructor(private router: Router, private toasterService: ToasterService) { }

  ngOnInit() { }

  remove(item, index) {
    this.panier.items.splice(index, 1);
    this.panier.total -= item.price;
  }

  order() {
    if (this.panier.total >= 50) {
      this.validateOrder();
    } else {
      this.popToast('warning', 'Montant minimun', 'Le montant minimun est de 15euros !');
    }
  }

  validateOrder() {
    localStorage.setItem('order', JSON.stringify(this.panier));
    this.router.navigate(['/order']);
  }

  popToast(type, title, body) {
    this.toasterService.pop(type, title, body);
  }
}
