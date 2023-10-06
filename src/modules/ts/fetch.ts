export const paramsToUrl = (url: string, params: object) => {
  const paramString = Object.entries(params)
    .flatMap(([key, value]) => {
      if (typeof value === "object" && Array.isArray(value)) {
        return (value as Array<number | string>).map((v) => `${key}=${v}`);
      }
      return `${key}=${value}`;
    })
    .join("&");

  return encodeURI(`${url}${paramString ? `?${paramString}` : ""}`);
};
