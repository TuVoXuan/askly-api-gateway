import { Session } from 'src/session/domain/session';

export type JwtRefreshPayloadType = {
  sessionId: Session['id'];
  hash: Session['id'];
  iat: number;
  exp: number;
};
