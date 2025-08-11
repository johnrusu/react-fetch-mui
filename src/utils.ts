import { anyPass, isEmpty, isNil } from "ramda";

const isArrayNotEmpty = (arr: any[]): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};

/**
 * Returns `true` if the given value is its type's empty value, `null` or `undefined`.
 *
 * @func isNilOrEmpty
 * @memberOf Validator
 * @category Validator
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {Boolean}
 * @see {@link http://ramdajs.com/docs/#isEmpty|isEmpty}, {@link http://ramdajs.com/docs/#isNil|isNil}
 * @example
 *
 * Validator.isNilOrEmpty([1, 2, 3]); //=> false
 * Validator.isNilOrEmpty([]); //=> true
 * Validator.isNilOrEmpty(''); //=> true
 * Validator.isNilOrEmpty(null); //=> true
 * Validator.isNilOrEmpty(undefined): //=> true
 * Validator.isNilOrEmpty({}); //=> true
 * Validator.isNilOrEmpty({length: 0}); //=> false
 */
const isNilOrEmpty = anyPass([isNil, isEmpty]);

const highlightText = (text: string, search: string): string => {
  if (!text || !search) return text;

  const regex = new RegExp(`(${search})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
};

export {
  isEmpty,
  anyPass,
  isNil,
  isArrayNotEmpty,
  isNilOrEmpty,
  highlightText,
};
