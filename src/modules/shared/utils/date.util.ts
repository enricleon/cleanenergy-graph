import dayjs from 'dayjs';

export const toISOString = (date: Date) => {
  return date !== undefined ? dayjs(date).format('YYYY-MM-DDTHH:mm') : undefined;
};
