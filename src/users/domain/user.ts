import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'helloworld@gmail.com',
  })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @ApiProperty({
    type: String,
    example: 'email',
  })
  provider: string;

  @ApiProperty({
    type: String,
    example: '1234567890',
  })
  socialId?: string | null;

  @ApiProperty({
    type: String,
    example: 'John',
  })
  firstName: string | null;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  lastName: string | null;

  @ApiProperty({
    type: String,
  })
  photo?: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
