import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchemaClass } from '../entities/user.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/domain/user';
import { UserMapper } from '../mappers/user.mapper';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class UsersDocumentRepository {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly usersModel: Model<UserSchemaClass>,
  ) {}

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
