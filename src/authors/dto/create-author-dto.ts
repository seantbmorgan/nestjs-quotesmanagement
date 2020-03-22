import { IsNotEmpty } from 'class-validator'

export class CreateAuthorDto{
    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string; 
}