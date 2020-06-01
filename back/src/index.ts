import app from './app';

const PORT = process.env.PORT || 4000;

// eslint-disable-next-line no-console
const handelAppStat = () => console.log(`Listening on port ${PORT}`);
app.listen(PORT, handelAppStat);
