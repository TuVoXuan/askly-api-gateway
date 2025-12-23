import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now } from 'mongoose';
import { UserSchemaClass } from 'src/users/infrastructure/persistence/entities/user.schema';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';

export type SessionSchemaDocument = HydratedDocument<SessionSchemaClass>;

@Schema({
  collection: 'session',
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class SessionSchemaClass extends EntityDocumentHelper {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserSchemaClass.name })
  user: UserSchemaClass;

  @Prop()
  hash: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(SessionSchemaClass);

SessionSchema.index({ user: 1 });
