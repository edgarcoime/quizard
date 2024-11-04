export default function toKebabCase(str: string): string | null {
  const matched =
    str &&
    str.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
    );

  if (!matched) {
    return null;
  }

  return matched.map((c) => c.toLowerCase()).join("-");
}
