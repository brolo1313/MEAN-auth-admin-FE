import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreMarketsService {

  private selectMarketsProfilesList = signal<any>({});
  private selectAllMarketsList = signal<any>([]);

  private dataIsLoadingMarketsProfilesList = signal<boolean>(false);

  constructor() {
  }

  setDataIsLoadingMarketsProfilesList(data: boolean) {
    this.dataIsLoadingMarketsProfilesList.set(data);
  }

  getDataIsLoadingMarketsProfilesList() {
    return this.dataIsLoadingMarketsProfilesList();
  }

  storedAllMarketsList(data: any) {
    this.selectAllMarketsList.set(data);
  }

  getPlans() {
    return this.selectAllMarketsList();
  }
}
