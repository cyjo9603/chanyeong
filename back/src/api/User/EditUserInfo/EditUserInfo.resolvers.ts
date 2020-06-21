// import { Resolvers } from '../../../types/resolvers';
// import User from '../../../models/User';
// import privateResolver from '../../../utils/privateResolver';
// import { hashPassword } from '../../../utils/hashPassword';

// interface EditInfo {
//   [key: string]: string;
// }

/** EditInfo
 *  유저정보 수정,
 *  실제 배포시 동작 x
 */
// const resolvers: Resolvers = {
//   Mutation: {
//     EditUserInfo: privateResolver(async (_, args: EditInfo, context) => {
//       try {
//         const { password } = args;
//         const { id } = context.req.user;

//         const editInfo = Object.keys(args).reduce((value: EditInfo, key) => {
//           if (args[key] && key !== 'password') {
//             // eslint-disable-next-line no-param-reassign
//             value[key] = args[key];
//           }
//           return value;
//         }, {});

//         if (password) {
//           const hashedPassword = await hashPassword(password);
//           editInfo.password = hashedPassword;
//         }

//         await User.update(editInfo, { where: { id } });

//         return {
//           ok: true,
//         };
//       } catch (error) {
//         return {
//           ok: false,
//           error,
//         };
//       }
//     }),
//   },
// };

// export default resolvers;
