import { Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from 'src/interfaces';
import { CreateProductsDTO } from './dto/create-products.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt.guard';

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
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateProductsDTO) {
    return this.productsService.create(body);
  }

  // PUT: actualizar un producto existente
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id')id: string, @Body() body: Omit<IProduct, 'id'>){
return this.productsService.update(Number(id),body)
  }

@UseGuards(JwtAuthGuard)  @Delete(':id')
  remove(@Param('id') id: string){
    return this.productsService.remove(Number(id))
  }


}
