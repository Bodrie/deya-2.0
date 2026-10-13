/*
 * Bulgarian typesetting for running text and headings:
 * - one-letter words (и, в, с, а, е, у, к, о, я) are glued to the next word,
 *   so they never hang at the end of a line;
 * - "по-" and "най-" compounds do not break at their hyphen.
 */
const ONE_LETTER_WORD = /(^|[\s(„])([аевиксуоя]) /giu;
const COMPARATIVE = /(^|[\s(„])(по|най)-(?=\p{L})/giu;

export function nbsp(text: string): string {
  let out = text.replace(COMPARATIVE, "$1$2-\u2060");
  let previous: string;
  // Consecutive short words ("и в") need more than one pass.
  do {
    previous = out;
    out = out.replace(ONE_LETTER_WORD, "$1$2\u00A0");
  } while (out !== previous);
  return out;
}

/** Applies `nbsp` to every string in a content object. */
export function typeset<T>(value: T): T {
  if (typeof value === "string") return nbsp(value) as T;
  if (Array.isArray(value)) return value.map((item) => typeset(item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, typeset(item)]),
    ) as T;
  }
  return value;
}
