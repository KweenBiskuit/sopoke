import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items = [
    { title: 'Saumon & mangue', price: 10 },
    { title: 'Thon tropical', price: 12 },
    { title: 'Edamame et gingembre', price: 8 },
    { title: 'Saumon, Algues, Fruit de la passion', price: 9 },
  ];

  panier = {
    total: 0,
    items: []
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  add(item) {
    this.panier.items.push(item);
    this.panier.total += item.price;
  }

  remove(item, index) {
    this.panier.items.splice(index, 1);
    this.panier.total -= item.price;
  }

  order() {
    localStorage.setItem('order', JSON.stringify(this.panier));
    this.router.navigate(['/order']);
  }

}
