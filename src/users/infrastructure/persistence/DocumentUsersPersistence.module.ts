import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaClass } from './entities/user.schema';
import { UsersDocumentRepository } from './repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaClass.name, schema: UserSchema },
    ]),
  ],
  providers: [UsersDocumentRepository],
  exports: [UsersDocumentRepository],
})
export class DocumentUsersPersistenceModule {}
