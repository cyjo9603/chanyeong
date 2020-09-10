import axios from 'axios';

const URL_HTTP = 'http://' as const;
const URL_HTTPS = 'https://' as const;

export const TYPE_FOLDER_SKILL = 'skill' as const;
export const TYPE_FOLDER_POST = 'post' as const;

type Folder = typeof TYPE_FOLDER_SKILL | typeof TYPE_FOLDER_POST;

const httpsTransducer = (url: string) => {
  if (url.substr(0, 7) === URL_HTTP) {
    return URL_HTTPS + url.substr(7);
  }

  if (url.substr(0, 8) === URL_HTTPS) {
    return url;
  }

  return '';
};

export const getUploadImageUrl = async (image: File, type: Folder) => {
  const uploadName = `${+new Date()}${image.name}`;
  const { data } = await axios.put(`${process.env.IMAGE_UPLOAD_URL}${type}/${uploadName}&overwrite=true`, image, {
    headers: {
      Authorization: process.env.IMAGE_UPLOAD_SECRET_KEY,
      'Content-Type': 'application/octet-stream',
    },
  });

  const url = httpsTransducer(data?.file.url);

  return url;
};
