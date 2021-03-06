interface Cookies {
  [key: string]: string;
}

const COOKIE_SPLIT_CHAR = '; ';

const cookieParser = (cookies = ''): Cookies =>
  cookies.split(COOKIE_SPLIT_CHAR).reduce((parsingCookies: Cookies, cookieLine) => {
    const [key, value] = cookieLine.split('=');
    parsingCookies[key] = value;
    return parsingCookies;
  }, {});

export default cookieParser;
