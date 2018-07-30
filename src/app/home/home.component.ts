import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  title: string;
  description: string;

  constructor() { }

  ngOnInit() {
    this.title = `C'est quoi un poké bowl ?`;

    this.description = `Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Sit nam quasi neque iusto fugiat provident omnis fugit dolores
    minima, natus assumenda ut tempore ea ratione dolor modi eveniet? Doloribus, voluptates! Culpa modi aperiam voluptatum
    neque, laudantium error, animi eos est assumenda fugiat molestiae officiis, harum architecto dolor temporibus sapiente.
    Qui consequatur unde esse obcaecati veritatis minima id iure? Nostrum, incidunt. Sunt, est aut, tenetur aspernatur eius,
    officiis quam mollitia ipsam cumque atque deleniti. Odio ad tempore laudantium aperiam magnam quibusdam minus architecto?
    Quod, sequi eveniet! Voluptatem debitis fugiat nostrum quos.`;
  }

}
