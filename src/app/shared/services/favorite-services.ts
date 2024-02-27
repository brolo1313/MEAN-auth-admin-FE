import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favoriteItems = signal<any>([]);
  private localStorageKey = 'favoriteList'

  constructor() {
    const storedData = localStorage.getItem(this.localStorageKey);
    if (storedData !== null) {
      const dataFromLocal = JSON.parse(storedData);
      this.favoriteItems.set(dataFromLocal)
    } 
  }

  getFavoriteItems(): any[] {
    return this.favoriteItems();
  }

  clearFavoriteItems() {
    this.favoriteItems.set([]);
    localStorage.removeItem(this.localStorageKey);
  }

  toggleFavorite(product: any) {
    const foundedInFavorite = this.favoriteItems().some( (items: any) => items['articul'] === product?.articul );

    if (!foundedInFavorite) {
      this.favoriteItems.set([...this.favoriteItems(), product]);

      localStorage.setItem(this.localStorageKey, JSON.stringify(this.favoriteItems()));
    } else {
      const data = this.favoriteItems().filter((vendor: any) => vendor.articul !== product?.articul);

      this.favoriteItems.set(data)
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.favoriteItems()));
    }
   }
}
