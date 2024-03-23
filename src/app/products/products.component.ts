import { Component } from '@angular/core';
import { Product } from '../product'; // import da interface Product de product.ts
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent { // criado componente recebendo um array vazio
  products: Product[] = [];

  formGroupProduct: FormGroup; // iniciando o FormGroup

  constructor(private formBuilder: FormBuilder) { // construtor usando formBuilder
    this.formGroupProduct = formBuilder.group({

      id       : ['0007'], // criando um formGroup inicialmente vazio ['']
      name     : ['Wendel'],
      price    : ['12.99'],
      quantity : ['41']
    });
  }

}
