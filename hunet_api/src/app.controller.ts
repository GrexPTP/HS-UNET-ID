import { Controller, Get, Request, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { FacebookAuthGuard } from './auth/guards/facebook-auth.guard';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  // @UseGuards(AuthGuard('facebook-token'))
  @UseGuards(FacebookAuthGuard)
  @Get('facebook')
  async getTokenAfterFacebookSignIn(@Req() req) {
    return 'req.user';
  }
  @Get('/')
  getMainPage() {
    return 'API service is now working';
  }
}
