import { sequelize } from '@models/.';

import app from './app';

const PORT = process.env.PORT || 4000;

// eslint-disable-next-line no-console
const handelAppStat = () => console.log(`Listening on port ${PORT}`);
sequelize
  .sync({ force: false })
  .then(() => app.listen(PORT, handelAppStat))
  .catch((error: Error) => console.log(error));
