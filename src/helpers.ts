export const sortByAsc = (data: any, type: string) => {
  const newData = [...data];

  const compare = (a: any, b: any) => {
    const elementA =
      typeof a[type] === "string" ? a[type].toLowerCase() : a[type];
    const elementB =
      typeof b[type] === "string" ? b[type].toLowerCase() : b[type];

    if (elementA < elementB) {
      return -1;
    }
    if (elementA > elementB) {
      return 1;
    }
    return 0;
  };
  return newData.sort(compare);
};

export const sortByDesc = (data: any, type: string) => {
  const newData = [...data];

  const compare = (a: any, b: any) => {
    const elementA =
      typeof a[type] === "string" ? a[type].toLowerCase() : a[type];
    const elementB =
      typeof b[type] === "string" ? b[type].toLowerCase() : b[type];

    if (elementA > elementB) {
      return -1;
    }
    if (elementA < elementB) {
      return 1;
    }
    return 0;
  };
  return newData.sort(compare);
};
