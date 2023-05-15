import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories = [
    {
      image : 'assets/img/cat-1.jpg',
      categoryName : 'Category Name',
      totalProduct : '100 Product'
    },
    {
      image : 'assets/img/cat-2.jpg',
      categoryName : 'Category Name',
      totalProduct : '100 Product'
    },
    {
      image : 'assets/img/cat-3.jpg',
      categoryName : 'Category Name',
      totalProduct : '100 Product'
    },
    {
      image : 'assets/img/cat-4.jpg',
      categoryName : 'Category Name',
      totalProduct : '100 Product'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
