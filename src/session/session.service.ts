import { Injectable } from '@nestjs/common';
import { SessionDocumentRepository } from './infrastructure/persistence/repositories/session.repository';
import { Session } from './domain/session';
import { NullableType } from 'src/utils/types/nullable.type';
import { User } from 'src/users/domain/user';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionDocumentRepository) {}

  findById(id: Session['id']): Promise<NullableType<Session>> {
    return this.sessionRepository.findById(id);
  }

  create(
    data: Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Session> {
    return this.sessionRepository.create(data);
  }

  update(
    id: Session['id'],
    payload: Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<NullableType<Session>> {
    return this.sessionRepository.update(id, payload);
  }

  deleteById(id: Session['id']): Promise<string> {
    return this.deleteById(id);
  }

  deleteByUserId(userId: User['id']): Promise<string> {
    return this.deleteByUserId(userId);
  }

  deleteByUserIdWithExclude(
    userId: User['id'],
    excludedId: Session['id'],
  ): Promise<string> {
    return this.deleteByUserIdWithExclude(userId, excludedId);
  }
}
