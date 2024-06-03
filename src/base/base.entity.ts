import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: Boolean;
}
