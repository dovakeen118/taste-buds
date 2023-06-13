export const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const hoursOutput = hours ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
  const minutesOutput = minutes ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "";
  const output = hoursOutput
    ? `${hoursOutput}${minutesOutput ? `, ${minutesOutput}` : ""}`
    : minutesOutput;
  return output;
};
