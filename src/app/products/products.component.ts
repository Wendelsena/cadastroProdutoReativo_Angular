import { Component, OnInit } from '@angular/core';
import { Product } from '../product'; // import da interface Product de product.ts
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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
      id       : ['', [Validators.required]],
      name     : ['', [Validators.required, Validators.minLength(3)]], // Corrigido aqui
      price    : ['', [Validators.required, Validators.minLength(1)]],
      quantity : ['', [Validators.required, Validators.minLength(1)]]
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
    if(this.formGroupProduct.valid){
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

  get id(): any {
    return this.formGroupProduct.get('id')
  }
  get name(): any {
    return this.formGroupProduct.get("name")
  }
  get price(): any {
    return this.formGroupProduct.get("price")
  }
  get quantity(): any {
    return this.formGroupProduct.get("quantity")
  }

  validateField(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

}
