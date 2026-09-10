export function resolveBranches(parsedInstructions, labelTable) {
    const branches = {};

    for (let i = 0; i < parsedInstructions.length; i++) {
        const instruction = parsedInstructions[i];

        if (instruction.type !== "instruction") {
            continue;
        }

        // Find the next executable instruction
        const nextInstruction = parsedInstructions
            .slice(i + 1)
            .find(item => item.type === "instruction");

        switch (instruction.opcode) {

            // --------------------------------
            // Unconditional jump
            // --------------------------------

            case "j": {
                const targetLabel = instruction.operands[0];

                const target = labelTable[targetLabel];

                branches[instruction.id] = {
                    type: "jump",
                    target,
                };

                break;
            }

            // --------------------------------
            // Conditional branches
            // --------------------------------

            case "beq":
            case "bne":
            case "blt": {
                const targetLabel = instruction.operands[2];

                branches[instruction.id] = {
                    type: "branch",

                    trueTarget:
                        labelTable[targetLabel] ?? null,

                    falseTarget:
                        nextInstruction?.id ?? null,
                };

                break;
            }

            // --------------------------------
            // Normal instruction
            // --------------------------------

            default: {
                branches[instruction.id] = {
                    type: "normal",
                    next: nextInstruction?.id ?? null,
                };

                break;
            }
        }
    }

    console.log("Branch Table:", branches);

    return branches;
}