import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBooked'
})
export class FilterBookedPipe implements PipeTransform {

  transform(value: any[], filterString: string, firstPropName: string, secondPropName: string): any[] {
    const result: any = [];
    if (!value || filterString ==='' || firstPropName === '' || secondPropName === '') {
      return value
    }
    value.forEach((a: any) => {
      if(a[firstPropName][secondPropName].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(a);
      }
    });
    return result;
  }

}
