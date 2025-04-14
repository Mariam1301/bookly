export function formatDateToISODate(date: Date | string) {
  if (!date) {
    return null;
  }
  const localDate = new Date(date as Date);
  const year = localDate.getFullYear();
  const month = ('0' + (localDate.getMonth() + 1)).slice(-2);
  const day = ('0' + localDate.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}
