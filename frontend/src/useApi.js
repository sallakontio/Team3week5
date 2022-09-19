export const LoadingState = {
  Initial: 'initial',
  Loading: 'loading',
};

const isOk = (statusCode) => {
  return statusCode >= 200 && statusCode < 300;
};

const handleJsonResponse = async (response) => {
  if (isOk(response.status)) {
    return await response.json();
  } else {
    const rejectedBody = await response.json();
    return Promise.reject({
      statusText: response.statusText,
      message: rejectedBody,
    });
  }
};

export const getJson = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
  });
  return handleJsonResponse(response);
};

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
