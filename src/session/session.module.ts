import { Module } from '@nestjs/common';
import { DocumentSessionPersistenceModule } from './infrastructure/persistence/DocumentSessionPersistence.module';
import { SessionService } from './session.service';

@Module({
  imports: [DocumentSessionPersistenceModule],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
