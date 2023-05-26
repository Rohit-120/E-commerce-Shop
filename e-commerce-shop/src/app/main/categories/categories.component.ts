import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories : any = [
    // {
    //   image : 'assets/img/cat-1.jpg',
    //   categoryName : 'Category Name',
    //   totalProduct : '100 Product'
    // },
    // {
    //   image : 'assets/img/cat-2.jpg',
    //   categoryName : 'Category Name',
    //   totalProduct : '100 Product'
    // },
    // {
    //   image : 'assets/img/cat-3.jpg',
    //   categoryName : 'Category Name',
    //   totalProduct : '100 Product'
    // },
    // {
    //   image : 'assets/img/cat-4.jpg',
    //   categoryName : 'Category Name',
    //   totalProduct : '100 Product'
    // },
  ]



  constructor(
    private commonService: CommonService,
    private router: Router,
    private apiCall: ApiService,
    private cdr : ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.productCategory()
  }

  productCategory() {
    this.apiCall.getProductCategories().subscribe({
      next: (res: any) => {
        console.log(res.data.categories, 'dashboard');
        this.categories = res.data.categories;
        this.cdr.markForCheck();
      },
    });
  }

  categoryClick(item : any){
      this.router.navigate([`/shop/${item.name}`])
  }

}
