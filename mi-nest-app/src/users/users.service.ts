import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/interfaces';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';


@Injectable()
export class UsersService {
  
  constructor(@InjectRepository(User)
  private usersRepo: Repository<User>

){}

  findAll() {
    return this.usersRepo.find();
  }

 async findOne(id: number)  {
    const userfind = await this.usersRepo.findOne({where: {id}})
    if (!userfind) throw new NotFoundException('Usuario no encontrado');
    return userfind
  }

  create(newUser: CreateUserDTO) {
   const userCreate = this.usersRepo.create(newUser)
    return this.usersRepo.save(userCreate);
  }



  async update(id: number, updateuser: UpdateUserDTO){
    await this.usersRepo.update(id, updateuser)
    return this.findOne(id);

  }

 async remove(id: number){
    const result = await this.usersRepo.delete(id)
    if(result.affected === 0) throw new NotFoundException('Usuario no encontrado')
    return {message: `El usuario con id ${id} fue eliminado` }
  }



}
