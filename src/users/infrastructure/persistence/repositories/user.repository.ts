import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/base/repositories/base.repository';
import { PaginationOptions } from 'src/common/base/repositories/pagination-options.interface';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';
import { User } from 'src/users/domain/user';
import { NullableType } from 'src/utils/types/nullable.type';
import { UserSchemaClass } from '../entities/user.schema';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UsersDocumentRepository extends BaseRepository<
  UserSchemaClass,
  User
> {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly usersModel: Model<UserSchemaClass>,
  ) {
    super(usersModel, ['firstName', 'lastName', 'email']);
  }

  async create(data: Partial<User>): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(data);
    const createdUser = new this.usersModel(persistenceModel);
    const userObject = await createdUser.save();
    return UserMapper.toDomain(userObject);
  }

  async findById(id: User['id']): Promise<NullableType<User>> {
    const userObject = await this.usersModel.findById(id);
    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async findByIds(ids: User['id'][]): Promise<User[]> {
    const userObjects = await this.usersModel.find({ _id: { $in: ids } });
    return userObjects.map((userObject) => UserMapper.toDomain(userObject));
  }

  async findByEmail(email: User['email']): Promise<NullableType<User>> {
    if (!email) return null;

    const userObject = await this.usersModel.findOne({ email });
    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async paginate(
    query: PaginationQueryDto,
    options: PaginationOptions<UserSchemaClass>,
    search?: string,
  ): Promise<PaginationResponseDto<User>> {
    return super.paginate(query, options, UserMapper, search);
  }

  async update(
    id: User['id'],
    payload: Partial<User>,
  ): Promise<NullableType<User>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const user = await this.usersModel.findOne(filter);

    if (!user) {
      return null;
    }

    const userObject = await this.usersModel.findOneAndUpdate(
      filter,
      UserMapper.toPersistence({
        ...UserMapper.toDomain(user),
        ...clonedPayload,
      }),
      { new: true },
    );

    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async remove(id: User['id']): Promise<void> {
    await this.usersModel.deleteOne({ _id: id.toString() });
  }
}
