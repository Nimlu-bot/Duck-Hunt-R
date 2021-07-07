import { define } from 'typeorm-seeding';
import { User } from '../entities/user.entity';

define(User, () => {
  const user = new User();
  user.name = 'admin';
  user.login = 'admin';
  user.password = 'admin';
  return user;
});
