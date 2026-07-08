import { instructionMap } from "./instructionMap";
export function generateFlowchart(parsedInstructions) {
    const nodes = [];
    const edges = [];

    let y = 0;

    // Start node
    nodes.push({
        id: "start",
        position: { x: 250, y },
        data: { label: "Start" },
        type: "input",
    });

    let previousId = "start";

    y += 100;

    parsedInstructions.forEach((instruction, index) => {

        // Skip labels for now
        if (instruction.type === "label") {
            return;
        }

        const info = instructionMap[instruction.opcode] || {
         shape: "process",
         description: "Unknown instruction"
        };
        const id = `node-${index}`;

        nodes.push({
            id,
            position: { x: 250, y },
            data: {
                label: `${instruction.opcode}\n${instruction.operands.join(", ")}`,
            },
        });

        edges.push({
            id: `edge-${previousId}-${id}`,
            source: previousId,
            target: id,
        });

        previousId = id;
        y += 100;
    });

    nodes.push({
        id: "end",
        position: { x: 250, y },
        data: { label: "End" },
        type: "output",
    });

    edges.push({
        id: "edge-end",
        source: previousId,
        target: "end",
    });

    return { nodes, edges };
}