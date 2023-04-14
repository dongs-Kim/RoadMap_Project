export const getUrl = (url: string) => {
  if (url.match(/https?:\/\//i)) {
    return url;
  }
  return `//${url}`;
};
