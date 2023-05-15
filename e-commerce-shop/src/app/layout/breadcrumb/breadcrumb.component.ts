import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {

  breadcrumb : any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private cdr : ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    // getting breadcrumb data through the breadcrumb service.
    
    this.breadcrumbService.breadcrumb.subscribe({
      next : (res) => {
          this.breadcrumb = res; 
        this.cdr.markForCheck();
      }
    })  
  }

}
