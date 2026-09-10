import { MarkerType } from "reactflow";

import { layoutFlowchart } from "./layoutFlowchart";
import { instructionMap } from "./instructionMap";
import { createProcessNode } from "./generators/processNode";
import { createDecisionNode } from "./generators/decisionNode";

export function generateFlowchart(parsedInstructions, branchTable) {
    const nodes = [];
    const edges = [];
    const nodeMap = {};

    const CENTER_X = 300;
    const VERTICAL_SPACING = 140;

    let y = 0;

    // --------------------------------
    // Start
    // --------------------------------

    nodes.push({
        id: "start",

        position: {
            x: CENTER_X,
            y,
        },

        data: {
            label: "Start",
        },

        type: "input",

        style: {
            width: 360,
            height: 120,
            fontSize: 30,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            boxSizing: "border-box",
        },
    });

    y += VERTICAL_SPACING;

    // --------------------------------
    // Create instruction nodes
    // --------------------------------

    parsedInstructions.forEach((instruction, index) => {
        if (instruction.type !== "instruction") {
            return;
        }

        const id = `node-${index}`;

        // Connect the original instruction ID
        // to the generated React Flow node ID
        nodeMap[instruction.id] = id;

        const info = instructionMap[instruction.opcode] || {
            shape: "process",
            description: "Unknown instruction",
        };

        let node;

        // --------------------------------
        // Decision nodes
        // --------------------------------

        if (
            instruction.opcode === "beq" ||
            instruction.opcode === "bne" ||
            instruction.opcode === "blt"
        ) {
            node = createDecisionNode(
                instruction,
                id,
                y
            );
        }

        // --------------------------------
        // Normal process nodes
        // --------------------------------

        else {
            node = createProcessNode(
                instruction,
                id,
                y
            );
        }

        // Keep nodes centered initially
        node.position.x = CENTER_X;

        nodes.push(node);

        y += VERTICAL_SPACING;
    });

    // --------------------------------
    // End
    // --------------------------------

    nodes.push({
        id: "end",

        position: {
            x: CENTER_X,
            y,
        },

        data: {
            label: "End",
        },

        type: "output",

        style: {
            width: 360,
            height: 120,
            fontSize: 30,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            boxSizing: "border-box",
        },
    });

    // --------------------------------
    // Position branch targets
    // --------------------------------

    for (const instruction of parsedInstructions) {
        if (instruction.type !== "instruction") {
            continue;
        }

        const branch = branchTable[instruction.id];

        if (!branch || branch.type !== "branch") {
            continue;
        }

        const sourceId = nodeMap[instruction.id];

        const sourceNode = nodes.find(
            node => node.id === sourceId
        );

        if (!sourceNode) {
            continue;
        }

        const branchY = sourceNode.position.y + 220;

        // --------------------------------
        // TRUE / YES target
        // --------------------------------

        if (branch.trueTarget) {
            const targetId = nodeMap[branch.trueTarget];

            const targetNode = nodes.find(
                node => node.id === targetId
            );

            if (targetNode) {
                targetNode.position.x = 50;
                targetNode.position.y = branchY;
            }
        }

        // --------------------------------
        // FALSE / NO target
        // --------------------------------

        if (branch.falseTarget) {
            const targetId = nodeMap[branch.falseTarget];

            const targetNode = nodes.find(
                node => node.id === targetId
            );

            if (targetNode) {
                targetNode.position.x = 650;
                targetNode.position.y = branchY;
            }
        }
    }

    // --------------------------------
    // Connect Start
    // --------------------------------

    const firstInstruction = parsedInstructions.find(
        item => item.type === "instruction"
    );

    if (firstInstruction) {
        edges.push({
            id: "edge-start",

            source: "start",

            target: nodeMap[firstInstruction.id],

            type: "smoothstep",

            markerEnd: {
                type: MarkerType.ArrowClosed,
            },
        });
    }

    // --------------------------------
    // Create control-flow edges
    // --------------------------------

    for (const instruction of parsedInstructions) {
        if (instruction.type !== "instruction") {
            continue;
        }

        const branch = branchTable[instruction.id];

        if (!branch) {
            continue;
        }

        const source = nodeMap[instruction.id];

        if (!source) {
            continue;
        }

        switch (branch.type) {

            // --------------------------------
            // Normal instruction
            // --------------------------------

            case "normal":

                if (branch.next) {
                    edges.push({
                        id: `${source}-${nodeMap[branch.next]}`,

                        source,

                        target: nodeMap[branch.next],

                        type: "smoothstep",

                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                        },
                    });
                }

                else {
                    edges.push({
                        id: `${source}-end`,

                        source,

                        target: "end",

                        type: "smoothstep",

                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                        },
                    });
                }

                break;

            // --------------------------------
            // Unconditional jump
            // --------------------------------

            case "jump":

                if (branch.target) {
                    edges.push({
                        id: `${source}-${nodeMap[branch.target]}`,

                        source,

                        target: nodeMap[branch.target],

                        type: "smoothstep",

                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                        },
                    });
                }

                break;

            // --------------------------------
            // Conditional branch
            // --------------------------------

            case "branch":

                // YES branch
                if (branch.trueTarget) {
                    edges.push({
                        id: `${source}-true`,

                        source,

                        sourceHandle: "yes",

                        target: nodeMap[branch.trueTarget],

                        label: "Yes",

                        type: "smoothstep",

                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                        },

                        labelStyle: {
                            fontSize: 30,
                            fontWeight: "bold",
                            color: "black",
                        },

                        labelBgStyle: {
                            fill: "white",
                            fillOpacity: 1,
                        },

                        labelBgPadding: [20, 12],

                        labelBgBorderRadius: 8,
                    });
                }

                // NO branch
                if (branch.falseTarget) {
                    edges.push({
                        id: `${source}-false`,

                        source,

                        sourceHandle: "no",

                        target: nodeMap[branch.falseTarget],

                        label: "No",

                        type: "smoothstep",

                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                        },

                        labelStyle: {
                            fontSize: 30,
                            fontWeight: "bold",
                            color: "black",
                        },

                        labelBgStyle: {
                            fill: "white",
                            fillOpacity: 1,
                        },

                        labelBgPadding: [20, 12],

                        labelBgBorderRadius: 8,
                    });
                }

                break;

            // --------------------------------
            // Unknown branch type
            // --------------------------------

            default:
                break;
        }
    }

    // --------------------------------
    // Apply layout
    // --------------------------------

    layoutFlowchart(
        nodes,
        parsedInstructions,
        branchTable
    );

    // --------------------------------
    // Return flowchart
    // --------------------------------

    return {
        nodes,
        edges,
    };
}