import { format } from "date-fns";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "MMMM do, yyyy");
  return formattedDate;
};
