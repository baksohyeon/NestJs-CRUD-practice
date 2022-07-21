import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  //C
  async create(createUserRequest: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserRequest.expectedName;
    user.email = createUserRequest.email;
    user.password = createUserRequest.password;
    return this.save(user);
  }
  //R
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserByid(id: number): Promise<User> {
    const result = this.userRepository.findOne({ where: { id } });
    if (!result) {
      //예외처리
      throw new NotFoundException(`Can't find user having a id ${id}`);
    }
    return result;
  }
  //U
  // update(updateUserDto: UpdateUserDto, userId: number) {
  //   return this.userRepository.update(userId, updateUserDto);
  // }

  async update(updateUserDto: UpdateUserDto) {
    const existingUser = await this.findUserByid(updateUserDto.id);
    existingUser.id = updateUserDto.id;
    return this.save(existingUser);
  }

  //D
  async delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  private save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
