import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';

import { SetCookies, Cookies } from '@nestjsplus/cookies';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @SetCookies()
  @Post('/signin')
  signIn(
    @Request() req,
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.singIn(authCredentialsDto).then(response => {
      const refreshToken = response.refreshToken;
      req._cookies = [
        {
          name: 'refreshToken',
          value: refreshToken,
          options: {
            httpOnly: true,
            domain: 'localhost',
          },
        },
      ];
      return { accessToken: response.accessToken };
    });
  }

  @SetCookies()
  @Post('/refresh')
  refreshToken(
    @Request() req,
    @Cookies() cookies,
  ): Promise<{ accessToken: string }> {
    console.log('Cookies: ', cookies);
    const { refreshToken } = cookies;

    return this.authService.refreshToken(refreshToken).then(response => {
      const refreshToken = response.refreshToken;
      req._cookies = [
        {
          name: 'refreshToken',
          value: refreshToken,
          options: {
            httpOnly: true,
            domain: 'localhost',
          },
        },
      ];
      return { accessToken: response.accessToken };
    });
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  logout(@Cookies() cookies) {
    const { refreshToken } = cookies;
    this.authService.logout(refreshToken)
  }

  @Post('/guardedtest')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
