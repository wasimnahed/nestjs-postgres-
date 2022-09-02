import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

//inject user repository
constructor(@InjectRepository(User) private readonly userRepository : Repository<User>){

}

  create(createUserDto: CreateUserDto): Promise<User> {
    let user: User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.age = createUserDto.age;
    return this.userRepository.save(user);
  }

  // findUserByAge(age: number){
  //   return this.userRepository.getUserByAge(age);
  // }

  findAll() : Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({where: {id}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user: User = new User();
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.age = updateUserDto.age;
    user.id=id;
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
