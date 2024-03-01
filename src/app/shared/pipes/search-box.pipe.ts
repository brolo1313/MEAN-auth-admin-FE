import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBox',
  standalone: true,
})
export class SearchBoxPipe implements PipeTransform {

  
    transform(items:any, marketName = '') {
        return marketName
          ? items.filter((request:any) => request.title && request.title.toLowerCase().includes(marketName.toLowerCase()))
          : items;
      }
    
  
  }
