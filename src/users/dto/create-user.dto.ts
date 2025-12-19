import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'test1@example.com',
  })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string | null;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ type: String, example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ type: String, example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  photo?: string | null;
}
