import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private userService: UserService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      return false;
    }

    try {
      const newToken = token.substring(7);
      const decoded: any = this.authService.decodeToken(newToken);
      from(this.getUser(decoded.sub));

      return true;
    } catch (error) {
      return false;
    }
  }

  async getUser(decoded: number) {
    const response = await this.userService.getUserById(decoded);
    if (!response) {
      throw new HttpException('User not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
