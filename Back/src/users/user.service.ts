import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class UserService {
  constructor(
    private authService: AuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async getUserById(id: number) {
    const result = await this.userRepository.findOneBy({ id: id });
    return result;
  }

  async authUser(data: AuthUserDto) {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new HttpException('User not exist', HttpStatus.BAD_REQUEST);
    }

    const password = await this.authService.validatePassword(data.password, user.password);
    if (!password) {
      throw new HttpException('Password invalid', HttpStatus.BAD_REQUEST);
    }

    const token = this.authService.generateToken(user.id);

    return {
      token: token,
      fullName: user.fullName,
      email: user.email
    }
  }

  async createUser(data: CreateUserDto) {
    await this.validateUser(data.email);
    const password = await this.authService.hashPassword(data.password);
    const body = {
      fullName: data.fullName,
      email: data.email,
      password: password
    }
    const obj = this.userRepository.create(body);
    const response = await this.userRepository.save(obj);
    return { response: response, message: 'User created' };
  }

  async validateUser(data: string) {
    const user = await this.userRepository.findOneBy({ email: data });
    if (user) {
      throw new HttpException('Email exist', HttpStatus.BAD_REQUEST);
    }
  }
}
