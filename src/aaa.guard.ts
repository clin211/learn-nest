import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AaaGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('guard');
    console.log(
      'guard handler',
      this.reflector.get('roles', context.getHandler()),
    );
    console.log(
      'guard class:',
      this.reflector.get('roles', context.getClass()),
    );
    return true;
  }
}
