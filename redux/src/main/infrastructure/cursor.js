//see https://dev.twitter.com/overview/api/cursoring

/**
 * @param {string} nextCursor
 */
export function isLastCursor(nextCursor) {
  return nextCursor === "0";
}

export const defaultCursor = "-1";
