import { Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from 'src/interfaces';
import { CreateProductsDTO } from './dto/create-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET: obtener todos los productos
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // GET: obtener un producto por id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // POST: crear un nuevo producto
  @Post()
  create(@Body() body: CreateProductsDTO) {
    return this.productsService.create(body);
  }

  // PUT: actualizar un producto existente
  @Put(':id')
  update(@Param('id')id: string, @Body() body: Omit<IProduct, 'id'>){
return this.productsService.update(Number(id),body)
  }


  @Delete(':id')
  remove(@Param('id') id: string){
    return this.productsService.remove(Number(id))
  }


}
