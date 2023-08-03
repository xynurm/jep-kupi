export const successResponse = ({
  status_code = 200,
  data = null,
  path = '',
}) => ({
  status: true,
  status_code: status_code,
  message: 'success',
  data: data,
  error: {
    name: null,
    message: null,
    response: null,
  },
  timestamp: new Date().toISOString(),
  path: path,
});
