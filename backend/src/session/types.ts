import { Request } from '@nestjs/common';

export interface SessionType extends Request {
  session: { passport: { user: { id: string; type?: 'guest' | 'user' } } };
}
