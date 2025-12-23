import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema, SessionSchemaClass } from './entities/session.schema';
import { SessionDocumentRepository } from './repositories/session.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SessionSchemaClass.name, schema: SessionSchema },
    ]),
  ],
  providers: [SessionDocumentRepository],
  exports: [SessionDocumentRepository],
})
export class DocumentSessionPersistenceModule {}
