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
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';

@Controller('products')
@UseGuards(RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET: obtener todos los productos
  @Get()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  findAll() {
    return this.productsService.findAll();
  }

  // GET: obtener un producto por id
  @Get(':id')
   @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Get('by-name/:name') //La ruta es http://localhost:3000/products/by-name/perro
   @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  findByName(@Param('name', ParseUpperPipe) name: string) {
    return this.productsService.findByName(name);
  }

  // POST: crear un nuevo producto
  @UseGuards(JwtAuthGuard)
  @Post()
   @Roles(RolesEnum.ADMIN)
  create(@Body() body: CreateProductsDTO) {
    return this.productsService.create(body);
  }

  // PUT: actualizar un producto existente
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @Roles(RolesEnum.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Omit<IProduct, 'id'>,
  ) {
    return this.productsService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
