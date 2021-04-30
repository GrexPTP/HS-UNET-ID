import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Reflector} from '@nestjs/core';

@Injectable()
export class FacebookAuthGuard extends AuthGuard('facebook-token') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      Logger.error(err);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
