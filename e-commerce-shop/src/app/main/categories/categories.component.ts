import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';

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

  constructor(
    private commonService: CommonService,
    private apiCall: ApiService,

  ) { }

  ngOnInit(): void {
  }

  // getCategories(){
  //   this.apiCall.getProductCategories().subscribe({
  //     next : (res) =>  {
  //       console.log(res)
        
  //     }
  //   })
  // }

}
