import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersDocumentRepository } from './infrastructure/persistence/repositories/user.repository';
import { User } from './domain/user';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcryptjs';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { NullableType } from 'src/utils/types/nullable.type';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersDocumentRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let password: string | undefined = undefined;
    if (createUserDto.password) {
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(createUserDto.password, salt);
    }

    let email: string | null = null;
    if (createUserDto.email) {
      const userObject = this.usersRepository.findByEmail(createUserDto.email);
      if (userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'email already exists',
          },
        });
      }
    }
    email = createUserDto.email;

    return this.usersRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: email,
      password: password,
      photo: createUserDto.photo,
      provider: createUserDto.provider ?? AuthProvidersEnum.email,
      socialId: createUserDto.socialId,
    });
  }

  findById(id: User['id']): Promise<NullableType<User>> {
    return this.usersRepository.findById(id);
  }

  findByIds(ids: User['id'][]): Promise<User[]> {
    return this.usersRepository.findByIds(ids);
  }

  findByEmail(email: User['email']): Promise<NullableType<User>> {
    return this.usersRepository.findByEmail(email);
  }

  async update(
    id: User['id'],
    updateUserDto: UpdateUserDto,
  ): Promise<NullableType<User>> {
    let password: string | undefined = undefined;

    if (updateUserDto.password) {
      const userObject = await this.usersRepository.findById(id);
      if (userObject) {
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(updateUserDto.password, salt);
      }
    }

    let email: string | null | undefined = undefined;

    if (updateUserDto.email) {
      const userObject = await this.usersRepository.findByEmail(
        updateUserDto.email,
      );
      if (userObject && userObject.id !== id) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'email already exists',
          },
        });
      }
      email = updateUserDto.email;
    } else if (updateUserDto.email === null) {
      email = null;
    }

    return this.usersRepository.update(id, {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      email,
      password,
      photo: updateUserDto.photo,
      provider: updateUserDto.provider,
      socialId: updateUserDto.socialId,
    });
  }

  async remove(id: User['id']): Promise<void> {
    await this.usersRepository.remove(id);
  }
}
