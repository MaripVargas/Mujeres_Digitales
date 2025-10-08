import { IsEmail, Length} from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email: string;

  @Length(6,10,{message: "La contrasena debe tener una longitud de minimo 6 caracteres y maximo 10"})
  password: string;
}
