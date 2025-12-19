import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ type: String, example: 'text1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiPropertyOptional({ type: String, example: 'John' })
  @IsOptional()
  firstName?: string | null;

  @ApiPropertyOptional({ type: String, example: 'Doe' })
  @IsOptional()
  lastName?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  photo?: string | null;
}
