export function FormatUserFriendlyTime(timeString: string): string {
  const dateTime = new Date(timeString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return dateTime.toLocaleDateString(undefined, options);
}
