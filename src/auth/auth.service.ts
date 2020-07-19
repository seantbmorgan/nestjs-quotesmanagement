import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { RefreshTokenRepository } from './refresh-token.repository';
const randtoken = require('rand-token');

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private refreshTokenRepository: RefreshTokenRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signup(authCredentialsDto);
  }

  async singIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const email = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!email) throw new UnauthorizedException(`Invalid credentials.`);

    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);

    const refreshToken = await this.refreshTokenRepository.newToken(email);

    return { accessToken, refreshToken };
  }

  async refreshToken(
    token: string,
  ): Promise<{ accessToken: string; refreshToken: any }> {
    console.log(token);

    const dbToken = await this.refreshTokenRepository.findOne({
      where: { token, isValid: true },
    });
    if (!dbToken)
      throw new NotFoundException(`User with 'refreshToken' not found`);

    const now = +new Date();
    if (+dbToken.expires - now <= 0) {
      await this.refreshTokenRepository
        .createQueryBuilder('refresh_token')
        .update('refresh_token')
        .set({ isValid: false })
        .where('token = :token', { token })
        .execute();
      throw new UnauthorizedException(`'refreshToken' expired`);
    }

    const { email } = dbToken;

    await this.refreshTokenRepository
      .createQueryBuilder('refresh_token')
      .update('refresh_token')
      .set({ isValid: false })
      .where('token = :token', { token })
      .execute();

    const refreshToken = await this.refreshTokenRepository.newToken(email);

    console.log(refreshToken);

    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, refreshToken };
  }

  async logout(token: string): Promise<void> {
    const response = await this.refreshTokenRepository
      .createQueryBuilder('refresh_token')
      .update('refresh_token')
      .set({ isValid: false })
      .where('token = :token', { token })
      .execute();

    console.log(response);
  }
}
