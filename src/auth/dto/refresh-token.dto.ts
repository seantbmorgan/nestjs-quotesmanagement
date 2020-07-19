import { MinLength, MaxLength, IsString, Matches, Length } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
    message: 'Please use a valid email address.',
  }) // https://www.regextester.com/95447
  email: string;
}
