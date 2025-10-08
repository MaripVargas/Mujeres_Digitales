import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { IProduct } from 'src/interfaces';
import { Repository } from 'typeorm';
import { CreateProductsDTO } from './dto/create-products.dto';
import { UpdateProductsDTO } from './dto/update-products.dto';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product)
private productsRepo: Repository<Product>
){}
 
  // devolver todos los productos
  findAll()  {
    return this.productsRepo.find();
  }

  
 async findOne(id: number){

  const productfind = await this.productsRepo.findOne({where: {id}})
  if (!productfind) {
    throw new NotFoundException(`Producto con id ${id} no encontrado`);
  }

  return productfind;
}

  create(newproduct: CreateProductsDTO){
    const productCreate = this.productsRepo.create(newproduct)
    return this.productsRepo.save(productCreate)
    
  }

  async update(id: number, updateproduct: UpdateProductsDTO){
    await this.productsRepo.update(id, updateproduct)
    return this.findOne(id)
   

  }

  async remove(id: number){

    const result = await this.productsRepo.delete(id)
    if (result.affected === 0)throw new NotFoundException('Producto no encontrado')
    return{messaje: `El producto con id ${id} fue eliminado`}
  
  }

  
}
