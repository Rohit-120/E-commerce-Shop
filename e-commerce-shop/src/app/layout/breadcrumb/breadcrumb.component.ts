import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {

  breadcrumb : any;
  isEnabled : boolean = false;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private cdr : ChangeDetectorRef,
    private router : Router,
  ) { }

  ngOnInit(): void {

    this.router.events.subscribe(events => {
      if(events instanceof NavigationEnd ){
        if(events.url == '/' || events.url == '')
        {
          this.isEnabled = true;
        }else
        {
          this.isEnabled = false;
        }
        
      }
      
    })

    // getting breadcrumb data through the breadcrumb service.
    this.breadcrumbService.breadcrumb.subscribe({
      next : (res) => {
          this.breadcrumb = res; 
        this.cdr.markForCheck();
      }
    })  
  }

}
