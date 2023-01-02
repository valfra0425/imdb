import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean>{
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();

    if(request?.user){
      const {role, id} =request.user
      if(roles.find(b => b == role)){
        return true
      }
      return false;
    }
    return false;
  }
}