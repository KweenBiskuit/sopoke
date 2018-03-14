import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  items = [
    { title: 'Saumon & mangue', price: 10 },
    { title: 'Thon tropical', price: 12 },
    { title: 'Edamame et gingembre', price: 8 },
    { title: 'Saumon Fruit de la passion', price: 9 },
  ];

  panier = {
    total: 0,
    items: []
  };

  commandeValide = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  add(item) {
    console.error(`Vous essayez d'ajouter ${item.title} à votre panier, mais le dev a oublié de coder cette fonctionnalité :( `);
    this.panier.items.push(item);
    this.panier.total += item.price;
  }

  remove(item, index) {
    this.panier.items.splice(index, 1);
    this.panier.total -= item.price;
  }

  order() {
    if (this.panier.total >= 30) {
      localStorage.setItem('order', JSON.stringify(this.panier));
      this.commandeValide = true;
      this.router.navigate(['/order']);
    } else {
      console.warn('Le montant de commande est de min 15euros !');
    }
  }

}
