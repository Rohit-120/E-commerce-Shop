import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories : any = [];



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
    this.apiCall.getTotalCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
        this.cdr.markForCheck();
      },
    });
  }

  categoryClick(item : any){
      this.router.navigate([`/shop/${item.title}`])
  }

}
