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

  storedMarketsProfilesList(data: any) {
    this.selectMarketsProfilesList.set(data);
  }

  storedAllMarketsList(data: any) {
    this.selectAllMarketsList.set(data);
  }
  getMarketsProfilesList() {
    return this.selectMarketsProfilesList();
  }

  getAllMarketsList() {
    return this.selectAllMarketsList();
  }

  addedMarketProfile(product: any) {
    this.selectMarketsProfilesList.set({
      ...this.selectMarketsProfilesList(),
      items: [...this.selectMarketsProfilesList().items, product ]
    })
  }

  deleteMarketProfile(profileId: any) {
    const data = this.selectMarketsProfilesList().items.filter((vendor: any) => vendor.id !== profileId);

    this.selectMarketsProfilesList.set({
      ...this.selectMarketsProfilesList(),
      items: [...data]
    })
  }

  updateMarketProfile(updatedMarket: any) {
    const data = this.selectMarketsProfilesList().items.map((vendor: any) => {
      return vendor.id == updatedMarket.id ? updatedMarket : vendor;
    });

    this.selectMarketsProfilesList.set({
      ...this.selectMarketsProfilesList(),
      items: [...data]
    })
  }
}
