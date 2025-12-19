import { User } from 'src/users/domain/user';
import { UserSchemaClass } from '../entities/user.schema';

export class UserMapper {
  static toDomain(raw: UserSchemaClass): User {
    const domainEntity = new User();
    domainEntity.id = raw._id?.toString();
    domainEntity.email = raw.email;
    domainEntity.provider = raw.provider;
    domainEntity.socialId = raw.socialId;
    domainEntity.firstName = raw.firstName;
    domainEntity.lastName = raw.lastName;
    domainEntity.photo = raw.photo;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Partial<User>): Partial<UserSchemaClass> {
    const persistenceObj: Partial<UserSchemaClass> = {};
    if (domainEntity.id && typeof domainEntity.id === 'string') {
      persistenceObj._id = domainEntity.id as any;
    }
    persistenceObj.email = domainEntity.email;
    if (domainEntity.password !== undefined) {
      persistenceObj.password = domainEntity.password;
    }
    persistenceObj.provider = domainEntity.provider;
    persistenceObj.socialId = domainEntity.socialId;
    persistenceObj.firstName = domainEntity.firstName;
    persistenceObj.lastName = domainEntity.lastName;
    persistenceObj.photo = domainEntity.photo;
    persistenceObj.createdAt = domainEntity.createdAt;
    persistenceObj.updatedAt = domainEntity.updatedAt;
    persistenceObj.deletedAt = domainEntity.deletedAt;
    return persistenceObj;
  }
}
