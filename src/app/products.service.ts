import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url="http://localhost:3000/products"; // para testar o bd json 

  constructor(private http : HttpClient) { } // injetando a dependencia 

  getProducts() : Observable<Product[]> { // observable para dizer que é assincrono. (todas chamadas backend devem ser assim)
    return  this.http.get<Product[]>(this.url);
  }

  save(product : Product): Observable<Product> { // post salva o novo produto
    return this.http.post<Product>(this.url, product);
  }
}
