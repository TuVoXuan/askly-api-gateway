import { Module } from '@nestjs/common';
import { DocumentUsersPersistenceModule } from './infrastructure/persistence/DocumentUsersPersistence.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DocumentUsersPersistenceModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, DocumentUsersPersistenceModule],
})
export class UsersModule {}
