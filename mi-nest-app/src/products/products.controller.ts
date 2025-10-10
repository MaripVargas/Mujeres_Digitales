import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from 'src/interfaces';
import { CreateProductsDTO } from './dto/create-products.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt.guard';
import { ParseUpperPipe } from 'src/common/pipes/parse-upper.pipe';

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

  @Get('by-name/:name') //La ruta es http://localhost:3000/products/by-name/perro
  findByName(@Param('name', ParseUpperPipe) name: string) {
    return this.productsService.findByName(name);
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Omit<IProduct, 'id'>,
  ) {
    return this.productsService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
