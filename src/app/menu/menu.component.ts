import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  // FIXME : ajouter au panier ne fonctionne pas

  items = [
    { title: 'Saumon & concombre', price: 10 },
    { title: 'Thon tropical spicy', price: 12 },
    { title: 'Saumon Fruit de la passion', price: 9 },
    { title: 'Edamame & gingembre', price: 8 },
  ];

  panier = {
    total: 0,
    items: []
  };

  commandeValide = new Observable<boolean>();

  constructor(private router: Router, private toasterService: ToasterService) { }

  ngOnInit() {
  }

  add(item) {
    this.panier.items.push(item);
    this.panier.total += item.price;
    // console.error(`Vous essayez d'ajouter ${item.title} à votre panier, mais le dev a oublié de coder cette fonctionnalité :( `);
  }

  remove(item, index) {
    this.panier.items.splice(index, 1);
    this.panier.total -= item.price;
  }

  confirmOrder() {
    if (this.panier.total >= 15) {
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
