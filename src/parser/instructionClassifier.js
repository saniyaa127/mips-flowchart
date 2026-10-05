import { instructionMap } from "./instructionMap";

export function classifyInstruction(instruction) {
    if (!instruction || instruction.type !== "instruction") {
        return "unknown";
    }

    const opcode = instruction.opcode?.toLowerCase();
    const info = instructionMap[opcode];

    // If the instruction is not in the map,
    // treat it as a normal sequential instruction.
    if (!info) {
        return "normal";
    }

    // The instruction map determines its general behavior.
    switch (info.category) {

        case "branch":
            return "branch";

        case "jump":
            // jr $ra is a return rather than a regular jump.
            if (
                opcode === "jr" &&
                instruction.operands?.includes("$ra")
            ) {
                return "return";
            }

            if (opcode === "jal") {
                return "call";
            }

            return "jump";

        default:
            return "normal";
    }
}
console.log(
    "Instruction classifier loaded"
);