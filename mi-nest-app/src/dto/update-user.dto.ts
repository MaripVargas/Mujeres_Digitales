import { IsNotEmpty, IsEnum } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';
import type { Roles } from 'src/entities/user.entity'; // 👈 importa tu enum Roles

export class UpdateUserDTO extends CreateUserDTO {
  @IsNotEmpty({ message: 'El rol no puede estar vacío' })

  role: Roles;
}
