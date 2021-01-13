// import { Resolvers } from '@gql-types';
// import User from '@models/User';
// import { hashPassword } from '@utils/hashPassword';

/** SignUp
 *  id가 이미 있는지 검사 후
 *  없는 경우 회원가입,
 *  그외 에러코드 응답
 */
// const resolvers: Resolvers = {
//   Mutation: {
//     SignUp: async (_, args) => {
//       try {
//         const { userId, password, familyName, givenName } = args;
//         const isUserId = await User.findOne({ where: { userId } });
//         if (!isUserId) {
//           const hashedPassword = await hashPassword(password);

//           await User.create({
//             userId,
//             password: hashedPassword,
//             familyName,
//             givenName,
//           });

//           return {
//             ok: true,
//             error: null,
//           };
//         }
//         return {
//           ok: false,
//           error: 'ID already exists',
//         };
//       } catch (error) {
//         return {
//           ok: false,
//           error,
//         };
//       }
//     },
//   },
// };

// export default resolvers;
