import passport from 'passport';
import local from '@auth/passport/local';
import jwt from '@auth/passport/jwt';

export default () => {
  passport.use('local', local);
  passport.use('jwt', jwt);
};
