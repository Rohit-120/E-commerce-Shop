import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let imagePath = `http://192.168.1.178:1108/` + value;
    return imagePath;
  }
}
