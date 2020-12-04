import { GraphQLLocalStrategy } from 'graphql-passport';

import User from '@models/User';
import { decryptValue } from '@utils/crypto';
import { comparePassword } from '@utils/hashPassword';

const NON_EXISTENT_USER = 'NON_EXISTENT_USER';

const BAD_PASSWORD = 'BAD_PASSWORD';

type VerifyFn = (username: unknown, password: unknown, done: () => void) => void;

type Authenticate = (
  userId: string,
  password: string,
  done: (error: Error | null, user?: any, options?: { message?: string }) => void,
) => void;

const authenticate: Authenticate = async (userId = '', password = '', done) => {
  try {
    const decrypedUserId = decryptValue(userId);
    const decrypedPassword = decryptValue(password);

    const user = await User.findOne({ where: { userId: decrypedUserId } });

    if (!user) {
      return done(null, false, { message: NON_EXISTENT_USER });
    }

    const checkPassword = await comparePassword(user.password, decrypedPassword);

    if (!checkPassword) {
      return done(null, false, { message: BAD_PASSWORD });
    }

    return done(null, user);
  } catch (error) {
    done(error);
  }
};
const local = new GraphQLLocalStrategy(authenticate as VerifyFn);

export default local;
