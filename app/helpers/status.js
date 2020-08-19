const successMessage = { success: true };
const errorMessage = { success: false };
const emptyMessage = { success: true, data: [] };
const status = {
  success: 200,
  error: 500,
  notfound: 404,
  unauthorized: 401,
  conflict: 409,
  created: 201,
  bad: 400,
  nocontent: 204,
};

const booking_statuses = {
  active: 1.00,
  cancelled: 2.00,
}
export {
  successMessage,
  errorMessage,
  emptyMessage,
  status,
  booking_statuses
};