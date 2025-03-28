import axios from "axios";

let tokens = {};

export const cancelAllRequests = () => {
  Object.keys(tokens).forEach((key) => {
    tokens[key].cancel("Cancelled by new test");
  });
};

export const cancelRequest = (key) => {
  if (tokens[key]) {
    tokens[key].cancel(
      `REQUEST_CANCELED: Only one request per key ${key} allowed at a time`
    );
  }
};

export const getCancelToken = (key) => {
  if (!key) return null;
  cancelRequest(key);
  tokens[key] = axios.CancelToken.source();
  return tokens[key].token;
};
