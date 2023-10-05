export const errorHandling = (status: number, message: any, data?: any) => {
  return {
    data,
    status,
    message,
  };
};
