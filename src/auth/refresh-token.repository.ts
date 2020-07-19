import { Repository, EntityRepository } from 'typeorm';
const randtoken = require('rand-token');

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RefreshToken } from './refresh-token.entity';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
  async newToken(email: string): Promise<string> {
    const refreshToken = new RefreshToken();
    var date = new Date();
    var expires = new Date(date.getTime() + 86400000); // 1 day in ms
    refreshToken.email = email;
    refreshToken.token = randtoken.uid(256);
    refreshToken.expires =  expires;
    refreshToken.isValid = true;
    try {
      await refreshToken.save();
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException(`Refresh Token Conflict`);
      throw new InternalServerErrorException();
    }
    return refreshToken.token;
  }

  //   async validateToken(
  //     authCredentialsDto: AuthCredentialsDto,
  //   ): Promise<string> {
  //     const { email, password } = authCredentialsDto;

  //     const user = await this.findOne({ email });

  //     if (user && await user.validatePassword(password)) {
  //       return user.email;
  //     } else {
  //       return null;
  //     }
  //   }

  //   async deleteToken(
  //     authCredentialsDto: AuthCredentialsDto,
  //   ): Promise<string> {
  //     const { email, password } = authCredentialsDto;

  //     const user = await this.findOne({ email });

  //     if (user && await user.validatePassword(password)) {
  //       return user.email;
  //     } else {
  //       return null;
  //     }
  //   }
}
