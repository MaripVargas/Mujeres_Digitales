import { IsNotEmpty, IsString, MaxLength, MinLength,IsNumber, IsPositive, IsInt,Min } from "class-validator";

export class CreateProductsDTO {

  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({message: "El nombre debe ser obligatorio"})
  @MinLength(3,{message: 'El nombre debe tener al menos 3 caracteres'})
  @MaxLength(100,{message: 'El nombre no puede superar los 100 caracteres'})
  name: string;

   @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @MaxLength(255, { message: 'La descripción no puede superar los 255 caracteres' })
  description: string;

  @IsString({ message: 'La categoría debe ser un texto' })
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  category: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser mayor que 0' })
  price: number;

  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;
}
