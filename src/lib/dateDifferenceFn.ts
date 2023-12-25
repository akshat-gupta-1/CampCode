import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
} from 'date-fns';
export const differencFn = (dateLeft: string, dateRight: string): string => {
  //@ts-ignore
  const dInMinutes = differenceInMinutes(dateLeft, dateRight);
  if (dInMinutes > 0) {
    //@ts-ignore
    const dInHours = differenceInHours(dateLeft, dateRight);
    if (dInHours > 0) {
      //@ts-ignore
      const dInDays = differenceInDays(dateLeft, dateRight);
      if (dInDays > 0) {
        //@ts-ignore
        const dInWeeks = differenceInWeeks(dateLeft, dateRight);
        if (dInWeeks > 0) {
          //@ts-ignore
          const dInMonths = differenceInMonths(dateLeft, dateRight);
          if (dInMonths > 0) {
            return `${
              dInMonths === 1 ? '1 month ago' : `${dInMonths} months ago`
            } `;
          } else {
            return `${
              dInWeeks === 1 ? '1 week ago' : `${dInWeeks} weeks ago`
            } `;
          }
        } else {
          return `${dInDays === 1 ? '1 day ago' : `${dInDays} days ago`} `;
        }
      } else {
        return `${dInHours === 1 ? '1 hour ago' : `${dInHours} hours ago`}`;
      }
    } else {
      return `${
        dInMinutes === 1 ? '1 minute ago' : `${dInMinutes} minutes ago`
      } `;
    }
  } else {
    return 'Just now';
  }
};
