import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Create user' })
  @Post('/create-user')
  async createUser(@Body() CreateUser: CreateUserDto): Promise<any> {
    return this.userService.createUser(CreateUser);
  }

  @ApiOperation({ summary: 'Login' })
  @Post('/auth')
  async authUser(@Body() user: AuthUserDto): Promise<any> {
    return this.userService.authUser(user);
  }
}
