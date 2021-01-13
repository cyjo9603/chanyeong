import { Strategy as JWTStrategy, ExtractJwt, VerifyCallback } from 'passport-jwt';
import dotenv from 'dotenv';

import User from '@models/User';

dotenv.config();

const NON_EXISTENT_USER = 'NON_EXISTENT_USER';

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const jwtVerify: VerifyCallback = async (jwtPayload, done) => {
  try {
    const user = await User.findOne({
      where: { id: jwtPayload.id },
    });

    if (user) {
      return done(null, user.id);
    }

    return done(null, false, { message: NON_EXISTENT_USER });
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const jwt = new JWTStrategy(JWTConfig, jwtVerify);

export default jwt;
