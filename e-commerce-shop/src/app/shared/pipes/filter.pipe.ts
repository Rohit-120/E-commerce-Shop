import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  constructor(
    private toastService: ToastrService
  ) {}
  
  /**
   *
   * @param value take object of products to filter
   * @param filterString property which comes from the user input
   * @param property filter the product object by particular property
   * @returns gives filter object of value (which is product object)
   */

  transform(value: any, filterString: any, property: any): any {
    if (value?.length == 0 || !filterString) {
      return value;
    }

    let filteredProduct: any[] = [];
    for (let product of value) {
      if (
        product[property].toLowerCase().includes(filterString.toLowerCase())
      ) {
        filteredProduct.push(product);
      }
    }

    if (filteredProduct.length == 0) {
      this.toastService.info('There is no such product available');
    }
    // console.log(filteredProduct);

    return filteredProduct;
  }
}
