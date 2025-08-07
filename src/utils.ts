const isArrayNotEmpty = (arr: any[]): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};

export { isArrayNotEmpty };
