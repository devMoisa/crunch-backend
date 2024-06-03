import { BaseEntity } from 'src/base/base.entity';

export class UserEntity extends BaseEntity {
  name: string;
  surname: string;
  email: string;
  password: string;
}
