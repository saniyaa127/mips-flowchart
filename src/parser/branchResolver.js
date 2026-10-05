import { instructionMap } from "./instructionMap";

export function resolveBranches(parsedInstructions, labelTable) {
    const branchTable = {};

    for (let i = 0; i < parsedInstructions.length; i++) {
        const instruction = parsedInstructions[i];

        if (instruction.type !== "instruction") {
            continue;
        }

        const opcode = instruction.opcode?.toLowerCase();
        const info = instructionMap[opcode];

        // Find the next actual instruction
        let nextInstruction = null;

        for (let j = i + 1; j < parsedInstructions.length; j++) {
            if (parsedInstructions[j].type === "instruction") {
                nextInstruction = parsedInstructions[j];
                break;
            }
        }

        /*
         * No instruction metadata:
         * Treat it as a normal sequential instruction.
         */
        if (!info || !info.controlFlow) {
            branchTable[instruction.id] = {
                type: "normal",
                next: nextInstruction?.id || null,
            };

            continue;
        }

        switch (info.controlFlow) {

            case "conditional": {
                const targetLabel =
                    instruction.operands?.[info.targetOperand];

                const targetId = labelTable[targetLabel];

                branchTable[instruction.id] = {
                    type: "branch",
                    trueTarget: targetId || null,
                    falseTarget: nextInstruction?.id || null,
                };

                break;
            }

            case "unconditional": {
                const targetLabel =
                    instruction.operands?.[info.targetOperand];

                const targetId = labelTable[targetLabel];

                branchTable[instruction.id] = {
                    type: "jump",
                    target: targetId || null,
                };

                break;
            }

            case "call": {
                const targetLabel =
                    instruction.operands?.[info.targetOperand];

                const targetId = labelTable[targetLabel];

                branchTable[instruction.id] = {
                    type: "call",
                    target: targetId || null,
                };

                break;
            }

            case "return": {
                branchTable[instruction.id] = {
                    type: "return",
                };

                break;
            }

            default: {
                branchTable[instruction.id] = {
                    type: "normal",
                    next: nextInstruction?.id || null,
                };
            }
        }
    }

    return branchTable;
}