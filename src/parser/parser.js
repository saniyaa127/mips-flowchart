import { tokenize } from "./tokenizer";

export function parse(code) {
  const tokens = tokenize(code);

  const parsed = [];

  tokens.forEach((token, index) => {
    const line = token.text;

    if (line.endsWith(":")) {
      parsed.push({
        id: `label-${index}`,
        line: token.line,
        type: "label",
        name: line.slice(0, -1),
      });

      return;
    }

    const parts = line.split(/\s+/);

    const opcode = parts[0];

    const operandText = line.substring(opcode.length).trim();

    const operands =
      operandText.length === 0
        ? []
        : operandText.split(",").map((op) => op.trim());

    parsed.push({
      id: `instruction-${index}`,
      line: token.line,
      type: "instruction",
      opcode,
      operands,
    });
  });

  return parsed;
}