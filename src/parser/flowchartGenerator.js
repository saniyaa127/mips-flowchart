import { MarkerType } from "reactflow";
import { layoutFlowchart } from "./layoutFlowchart";
import { instructionMap } from "./instructionMap";
import { createProcessNode } from "./generators/processNode";
import { createDecisionNode } from "./generators/decisionNode";

function getNextInstruction(instructions, index) {
    for (let i = index + 1; i < instructions.length; i++) {
        if (instructions[i].type === "instruction") {
            return instructions[i];
        }
    }
    return null;
}

function normalizeLabel(label) {
    return label ? label.trim().replace(/:$/, "") : "";
}

function buildLabelTable(instructions) {
    const table = {};

    instructions.forEach((item, index) => {
        if (item.type !== "label") return;

        const label = normalizeLabel(item.name);
        if (!label) return;

        for (let i = index + 1; i < instructions.length; i++) {
            if (instructions[i].type === "instruction") {
                table[label] = instructions[i].id;
                break;
            }
        }
    });

    return table;
}

function resolveControlFlow(instructions) {
    const table = {};
    const labels = buildLabelTable(instructions);

    instructions.forEach((instruction, index) => {
        if (instruction.type !== "instruction") return;

        const opcode = instruction.opcode?.toLowerCase();
        const info = instructionMap[opcode];
        const next = getNextInstruction(instructions, index);

        if (!info?.controlFlow) {
            table[instruction.id] = {
                type: "normal",
                next: next?.id || null
            };
            return;
        }

        if (info.controlFlow === "conditional") {
            const label = normalizeLabel(
                instruction.operands?.[info.targetOperand]
            );

            table[instruction.id] = {
                type: "branch",
                trueTarget: labels[label] || null,
                falseTarget: next?.id || null
            };
            return;
        }

        if (info.controlFlow === "unconditional") {
            const label = normalizeLabel(
                instruction.operands?.[info.targetOperand]
            );

            table[instruction.id] = {
                type: "jump",
                target: labels[label] || null
            };
            return;
        }

        if (info.controlFlow === "call") {
            const label = normalizeLabel(
                instruction.operands?.[info.targetOperand]
            );

            table[instruction.id] = {
                type: "call",
                target: labels[label] || null
            };
            return;
        }

        if (info.controlFlow === "return") {
            table[instruction.id] = { type: "return" };
            return;
        }

        table[instruction.id] = {
            type: "normal",
            next: next?.id || null
        };
    });

    return table;
}

function createArrow(source, target, id, extra = {}) {
    return {
        id,
        source,
        target,
        type: "smoothstep",
        markerEnd: {
            type: MarkerType.ArrowClosed
        },
        ...extra
    };
}

export function generateFlowchart(parsedInstructions, labelTable) {
    const nodes = [];
    const edges = [];
    const nodeMap = {};
    const branchTable = resolveControlFlow(parsedInstructions);

    const CENTER_X = 300;
    const VERTICAL_SPACING = 140;

    let y = 0;

    // Start
    nodes.push({
        id: "start",
        position: { x: CENTER_X, y },
        data: { label: "Start" },
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
            boxSizing: "border-box"
        }
    });

    y += VERTICAL_SPACING;

    // Instruction nodes
    parsedInstructions.forEach((instruction, index) => {
        if (instruction.type !== "instruction") return;

        const nodeId = `node-${index}`;
        nodeMap[instruction.id] = nodeId;

        const opcode = instruction.opcode?.toLowerCase();
        const info = instructionMap[opcode] || { shape: "process" };

        const node =
            info.shape === "decision"
                ? createDecisionNode(instruction, nodeId, y)
                : createProcessNode(instruction, nodeId, y);

        node.position.x = CENTER_X;
        nodes.push(node);

        y += VERTICAL_SPACING;
    });

    // End
    nodes.push({
        id: "end",
        position: { x: CENTER_X, y },
        data: { label: "End" },
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
            boxSizing: "border-box"
        }
    });

    // Start edge
    const firstInstruction = parsedInstructions.find(
        item => item.type === "instruction"
    );

    if (firstInstruction) {
        edges.push(
            createArrow(
                "start",
                nodeMap[firstInstruction.id],
                "edge-start"
            )
        );
    }

    // Control-flow edges
    for (const instruction of parsedInstructions) {
        if (instruction.type !== "instruction") continue;

        const branch = branchTable[instruction.id];
        const source = nodeMap[instruction.id];

        if (!branch || !source) continue;

        // Normal
        if (branch.type === "normal") {
            if (branch.next) {
                const target = nodeMap[branch.next];

                if (target) {
                    edges.push(
                        createArrow(
                            source,
                            target,
                            `${source}-${target}`
                        )
                    );
                }
            } else {
                edges.push(
                    createArrow(
                        source,
                        "end",
                        `${source}-end`
                    )
                );
            }

            continue;
        }

        // Jump
        if (branch.type === "jump") {
            const target = nodeMap[branch.target];

            if (target) {
                edges.push(
                    createArrow(
                        source,
                        target,
                        `${source}-${target}-jump`
                    )
                );
            }

            continue;
        }

        // Function call
        if (branch.type === "call") {
            const target = nodeMap[branch.target];

            if (target) {
                edges.push(
                    createArrow(
                        source,
                        target,
                        `${source}-${target}-call`
                    )
                );
            }

            continue;
        }

        // Conditional branch
        if (branch.type === "branch") {
            if (branch.trueTarget) {
                const target = nodeMap[branch.trueTarget];

                if (target) {
                    edges.push(
                        createArrow(
                            source,
                            target,
                            `${source}-true`,
                            {
                                sourceHandle: "yes",
                                label: "Yes",
                                labelStyle: {
                                    fontSize: 30,
                                    fontWeight: "bold",
                                    color: "black"
                                },
                                labelBgStyle: {
                                    fill: "white",
                                    fillOpacity: 1
                                },
                                labelBgPadding: [20, 12],
                                labelBgBorderRadius: 8
                            }
                        )
                    );
                }
            }

            if (branch.falseTarget) {
                const target = nodeMap[branch.falseTarget];

                if (target) {
                    edges.push(
                        createArrow(
                            source,
                            target,
                            `${source}-false`,
                            {
                                sourceHandle: "no",
                                label: "No",
                                labelStyle: {
                                    fontSize: 30,
                                    fontWeight: "bold",
                                    color: "black"
                                },
                                labelBgStyle: {
                                    fill: "white",
                                    fillOpacity: 1
                                },
                                labelBgPadding: [20, 12],
                                labelBgBorderRadius: 8
                            }
                        )
                    );
                }
            }

            continue;
        }

        // Return
        if (branch.type === "return") {
            edges.push(
                createArrow(
                    source,
                    "end",
                    `${source}-end-return`
                )
            );
        }
    }

    layoutFlowchart(
        nodes,
        parsedInstructions,
        branchTable
    );

    return { nodes, edges };
}