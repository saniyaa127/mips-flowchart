import { tokenize } from "./tokenizer";

export function parse(code) {
    const lines = tokenize(code);

    const parsed = [];

    for (const line of lines) {

        // Labels
        if (line.endsWith(":")) {

            parsed.push({
                type: "label",
                name: line.slice(0, -1)
            });

            continue;
        }

        // Instructions
        const parts = line.split(/\s+/);

        const opcode = parts[0];

        const operandText = line.substring(opcode.length).trim();

        const operands = operandText.length === 0
            ? []
            : operandText.split(",").map(op => op.trim());

        parsed.push({
            type: "instruction",
            opcode,
            operands
        });

    }

    return parsed;
}