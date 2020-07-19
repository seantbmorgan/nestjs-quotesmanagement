import { MinLength, MaxLength, IsString, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
    message: 'Please use a valid email address.',
  }) // https://www.regextester.com/95447
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    { message: 'Password to weak.' },
  ) // https://www.regextester.com/95447
  password: string;
}
