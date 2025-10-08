import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { LoginDTO } from 'src/dto/login.dto';
import { User } from 'src/entities/user.entity';
import { CreateProductsDTO } from 'src/products/dto/create-products.dto';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}


  async register (data: CreateUserDTO){

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userCreated = this.userRepo.create({ ...data, password: hashedPassword})
    await this.userRepo.save(userCreated);
    return { message: 'Usuaro registrado con exito', user: {id: userCreated.id, email: userCreated.email}}


  }


  async login(data: LoginDTO) {
    const user = await this.userRepo.findOne({ where: { email: data.email } });

    if (!user) {
      throw new UnauthorizedException('Credenciales Invalidas');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales Invalidas');
    }


    const  payloadToken = {sub: user.id, name: user.name, email: user.email};
    const token = await this.jwtService.signAsync(payloadToken);



    return { accessToken: token}

  }
}
