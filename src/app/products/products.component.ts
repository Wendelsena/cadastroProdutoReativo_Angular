import { Component, OnInit } from '@angular/core';
import { Product } from '../product'; // import da interface Product de product.ts
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{ // criado componente recebendo um array vazio (OnInit para implementar na tabela (json))
  products: Product[] = [];

  formGroupProduct: FormGroup; // iniciando o FormGroup

  isEditing: boolean = false; // diz se a edição está ou não ativa. (existem outras maneiras)

  constructor(private formBuilder: FormBuilder, // construtor usando formBuilder e service(json)
              private service    : ProductsService) {

      this.formGroupProduct = formBuilder.group({

      id       : [''], // criando um formGroup inicialmente vazio ['']
      name     : [''],
      price    : [''],
      quantity : ['']
    });
  }
  ngOnInit(): void { // carregar um produto se torna ua constante.
    this.loadProducts();
  }

  loadProducts() {
    // getProducts devolve o observable de products.
    this.service.getProducts().subscribe({  // subscribe para sobreescrever a resposta do backend e executa o que está dentro da função
      next: data => this.products = data
    });
  }

  save() {
    if(this.isEditing) {
      this.service.update(this.formGroupProduct.value).subscribe({
        next : () => {
          this.loadProducts();
          this.isEditing = false;
        }
      })
    }
    else {
      this.service.save(this.formGroupProduct.value).subscribe({ // salva os dados no json. (exibir na lista)
        next: data => this.products.push(data)
      });
    }
    this.formGroupProduct.reset();
  }

// next entrega o sucesso

  remove(product : Product) {
    this.service.remove(product).subscribe({
      next: () => this.loadProducts() // < para deixar claro, está não é a forma mais eficiente de tratar remoções
    });
  }

  edit(product : Product) { // pega o produto e altera os valores.
    this.formGroupProduct.setValue(product);
    this.isEditing = true;
  }
}
