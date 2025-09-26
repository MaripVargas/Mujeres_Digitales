import { Injectable, NotFoundException } from '@nestjs/common';
import { IProduct } from 'src/interfaces';

@Injectable()
export class ProductsService {
  private products: IProduct[] = [
    {
      id: 1,
      name: 'Laptop HP 14',
      description: 'Portátil con 8GB RAM y 256GB SSD',
      category: 'Tecnología',
      price: 2500000,
      stock: 12,
    },
    {
      id: 2,
      name: 'Silla ergonómica',
      description: 'Silla de oficina ajustable con soporte lumbar',
      category: 'Muebles',
      price: 450000,
      stock: 5,
    },
    {
      id: 3,
      name: 'Camiseta básica',
      description: 'Camiseta algodón 100% talla M',
      category: 'Ropa',
      price: 35000,
      stock: 30,
    },
    {
      id: 4,
      name: 'Mouse inalámbrico',
      description: 'Mouse óptico con receptor USB',
      category: 'Accesorios',
      price: 55000,
      stock: 0,
    },
    {
      id: 5,
      name: 'Botella de agua 1L',
      description: 'Botella plástica reutilizable',
      category: 'Hogar',
      price: 12000,
      stock: 50,
    },
  ];

  // devolver todos los productos
  findAll(): IProduct[] {
    return this.products;
  }

  // buscar por id o categoría (o ambos)
 findOne(id: number): IProduct {
  const product = this.products.find((product) => product.id === id);

  if (!product) {
    throw new NotFoundException(`Producto con id ${id} no encontrado`);
  }

  return product;
}

  create(product: Omit<IProduct, 'id'>): IProduct {
    const newId =
      this.products.length > 0
        ? this.products[this.products.length - 1].id + 1
        : 1;

    const newProduct: IProduct = {
      id: newId,
      ...product,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, newproducts: Omit<IProduct, 'id'>): IProduct{
    const product = this.findOne(id); 
    Object.assign(product,newproducts);
    return product;

  }

  remove(id: number){
    const product = this.products.findIndex((product) => product.id === id);
    this.products.splice(product, 1)
    return{delete: true}
  
  }

  
}
