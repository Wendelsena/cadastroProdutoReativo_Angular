import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs/internal/Observable'; // biblioteca para fazer as chamadas assincronas

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url="http://localhost:3000/products"; // para testar o bd json

  constructor(private http : HttpClient) { } // injetando a dependencia

  // crianção dos serviços >>>>

  getProducts() : Observable<Product[]> { // observable para dizer que é assincrono. (todas chamadas backend devem ser assim)
    return  this.http.get<Product[]>(this.url);
  }

  save(product : Product): Observable<Product> { // post salva o novo produto
    return this.http.post<Product>(this.url, product);
  }

  remove(product : Product): Observable<void> { // a variavel url junto ao id do produto (indicando a rota)
    return this.http.delete<void>(`${this.url}/${product.id}`);
  }

  update(product : Product): Observable<Product> { // atualiza os dados
    return this.http.put<Product>(`${this.url}/${product.id}`, product);
  }
}
