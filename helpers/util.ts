import {error as wderror} from 'selenium-webdriver';

/**
 * Returns false if an error indicates a missing or stale element, re-throws
 * the error otherwise
 *
 * @param {*} The error to check
 * @throws {*} The error it was passed if it doesn't indicate a missing or stale
 *   element
 * @return {boolean} false, if it doesn't re-throw the error
 */
export function falseIfMissing(error: any) {
    if ((error instanceof wderror.NoSuchElementError) ||
        (error instanceof wderror.StaleElementReferenceError)) {
      return false;
    } else {
      throw error;
    }
  }
  
  /**
   * Return a boolean given boolean value.
   *
   * @param {boolean} value
   * @returns {boolean} given value
   */
  export function passBoolean(value: boolean) {
    return value;
  }