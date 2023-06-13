import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories : any = [];
  subscriptions : Subscription[] = [];



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
    let sub1 = this.apiCall.getTotalCategories({isCategoryList : true}).subscribe({
      next: (res: any) => {
        this.categories = res.data.categories;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub1)
  }

  categoryClick(item : any){
      this.router.navigate([`/shop/${item.title}`])
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

}
