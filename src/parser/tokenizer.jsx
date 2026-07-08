export function tokenize(code) {
    return code
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            const commentIndex = line.indexOf("#");

            if (commentIndex !== -1) {
                return line.substring(0, commentIndex).trim();
            }

            return line;
        })
        .filter(line => line.length > 0);
}