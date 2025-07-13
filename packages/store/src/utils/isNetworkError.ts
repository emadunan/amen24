export const isNetworkError = (error: unknown): boolean => {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    error.status === "FETCH_ERROR"
  );
};