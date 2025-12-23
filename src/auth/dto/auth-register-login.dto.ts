import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@gmail.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John', type: String })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', type: String })
  @IsNotEmpty()
  lastName: string;
}
