import { Injectable } from '@nestjs/common';
import { SessionSchemaClass } from '../entities/session.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from 'src/session/domain/session';
import { NullableType } from 'src/utils/types/nullable.type';
import { SessionMapper } from '../mappers/session.mapper';
import { User } from 'src/users/domain/user';

@Injectable()
export class SessionDocumentRepository {
  constructor(
    @InjectModel(SessionSchemaClass.name)
    private readonly sessionModel: Model<SessionSchemaClass>,
  ) {}

  async findById(id: Session['id']): Promise<NullableType<Session>> {
    const sessionObject = await this.sessionModel.findById(id);
    return sessionObject ? SessionMapper.toDomain(sessionObject) : null;
  }

  async create(data: Partial<Session>): Promise<Session> {
    const persistenceModel = SessionMapper.toPersistence(data);
    const createdSession = new this.sessionModel(persistenceModel);
    const sessionObject = await createdSession.save();
    return SessionMapper.toDomain(sessionObject);
  }

  async update(
    id: Session['id'],
    payload: Partial<Session>,
  ): Promise<NullableType<Session>> {
    const clonedPayload = { ...payload };
    delete payload.id;
    delete payload.createdAt;
    delete payload.updatedAt;
    delete payload.deletedAt;

    const filter = { _id: id.toString() };
    const session = await this.sessionModel.findOne(filter);

    if (!session) {
      return null;
    }

    const sessionObject = await this.sessionModel.findOneAndUpdate(
      filter,
      SessionMapper.toPersistence({
        ...SessionMapper.toDomain(session),
        ...clonedPayload,
      }),
      { new: true },
    );

    return sessionObject ? SessionMapper.toDomain(sessionObject) : null;
  }

  async deleteById(id: Session['id']): Promise<string> {
    await this.sessionModel.deleteOne({ _id: id.toString() });
    return 'Delete session successfully.';
  }

  async deleteByUserId({ userId }: { userId: User['id'] }): Promise<string> {
    await this.sessionModel.deleteOne({ user: userId.toString() });
    return 'Delete session successfully.';
  }

  async deleteByUserIdWithExclude({
    userId,
    excludeSessionId,
  }: {
    userId: User['id'];
    excludeSessionId: Session['id'];
  }): Promise<string> {
    const transformCriteria = {
      user: userId.toString(),
      _id: { $not: { $eq: excludeSessionId.toString() } },
    };
    await this.sessionModel.deleteMany(transformCriteria);
    return 'Delete session by user id with excluded id successfully.';
  }
}
