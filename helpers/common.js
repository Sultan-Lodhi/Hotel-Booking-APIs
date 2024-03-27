export const successResponse = (res, message, data) => {
  res.status(200).json({
    success: true,
    message,
    ...(data && { data })
  });
};

export const errorResponse = (res, status, message) => {
  res.status(status).json({
    success: true,
    status,
    message
  });
};

export const formatPath = (path) => {
  const splitPathArr = path.split('/');
  const lastPart = splitPathArr[splitPathArr.length - 1];
  if (!isNaN(lastPart)) splitPathArr.pop();
  return splitPathArr.join('/');
};
