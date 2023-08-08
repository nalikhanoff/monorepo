import * as bcrypt from 'bcryptjs';

export default {
  modelName: 'User',
  data: [
    {
      login: 'erkul_dima',
      isAdmin: true,
      password: bcrypt.hashSync('erkul_dima', 10),
    },
  ],
};
