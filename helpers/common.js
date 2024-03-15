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
