import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Object for Home carousel Section
  homeCarouselItem: any = [];
  featureProd: boolean = true;
  features = [
    {
      feature: 'Quality Product',
      icon: 'fa fa-check',
    },
    {
      feature: 'Free Shipping',
      icon: 'fa fa-shipping-fast',
    },
    {
      feature: '14-Day Return',
      icon: 'fas fa-exchange-alt',
    },
    {
      feature: '24/7 Support',
      icon: 'fa fa-phone-volume',
    },
  ];
  carouselTabToggle: any = 0;
  offerProduct: any = [];
  subscriptions: Subscription[] = [];

  constructor(
    private apiCall: ApiService,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.heroPosterDetails();
    this.bulletButtonClick(this.carouselTabToggle);
  }

  // Api call for hero
  heroPosterDetails() {
    let sub1 = this.apiCall.getHeroPosterDetail().subscribe({
      next: (res: any) => {
        this.homeCarouselItem = res.data.carousels;
        this.offerProduct = res.data.offers;
        this.cdr.markForCheck();
      },
    });
    this.subscriptions.push(sub1);
  }

  /**
   * @param index index of clicked list of bullet button of hero carousel..
   */
  bulletButtonClick(index: number) {
    this.carouselTabToggle = index;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }
}
