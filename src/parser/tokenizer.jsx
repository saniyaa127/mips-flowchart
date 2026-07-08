export function tokenize(code) {
  return code
    .split("\n")
    .map((line, index) => ({
      text: line.trim(),
      line: index + 1,
    }))
    .map((entry) => {
      const commentIndex = entry.text.indexOf("#");

      if (commentIndex !== -1) {
        entry.text = entry.text.substring(0, commentIndex).trim();
      }

      return entry;
    })
    .filter((entry) => entry.text.length > 0);
}