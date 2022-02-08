export const sortByAsc = <T>(data: T[], type: string): T[] => {
  const newData: T[] = [...data];

  const compare = (a: T, b: T): number => {
    const typeT: keyof T = type as keyof T;

    if (a[typeT] < b[typeT]) {
      return -1;
    }
    if (a[typeT] > b[typeT]) {
      return 1;
    }
    return 0;
  };
  return newData.sort(compare);
};

export const sortByDesc = <T>(data: T[], type: string): T[] => {
  const newData: T[] = [...data];

  const compare = (a: T, b: T): number => {
    const typeT: keyof T = type as keyof T;

    if (a[typeT] > b[typeT]) {
      return -1;
    }
    if (a[typeT] < b[typeT]) {
      return 1;
    }
    return 0;
  };
  return newData.sort(compare);
};
