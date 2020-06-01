import { createConnection } from 'typeorm';

import app from './app';
import ConnectionOptions from './ormConfig';

const PORT = process.env.PORT || 4000;

// eslint-disable-next-line no-console
const handelAppStat = () => console.log(`Listening on port ${PORT}`);
createConnection(ConnectionOptions)
  .then(() => {
    app.listen(PORT, handelAppStat);
  })
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error));
