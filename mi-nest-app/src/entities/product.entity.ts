import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  name: string;

  @Column({ nullable: false })
  @IsString()
  description: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  category: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  price: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  @IsNumber({}, { message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;
}
