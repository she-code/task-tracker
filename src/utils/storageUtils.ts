export const getAuthToken = (): string | null => {
  const token = localStorage.getItem("token");
  return token;
};
