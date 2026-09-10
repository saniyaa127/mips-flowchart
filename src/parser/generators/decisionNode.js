export function createDecisionNode(instruction, id, y) {
    return {
        id,
        position: {
            x: 250,
            y,
        },
        data: {
            label: `${instruction.opcode}\n${instruction.operands.join(", ")}`,
        },
        type: "decision",
    };
}