export function layoutFlowchart(
    nodes,
    parsedInstructions,
    branchTable
) {
    const CENTER_X = 300;
    const LEFT_X = 40;
    const RIGHT_X = 650;

    const VERTICAL_SPACING = 180;
    const BRANCH_SPACING = 240;

    // --------------------------------
    // Build map from instruction ID
    // to React Flow node
    // --------------------------------

    const instructionNodes = {};

    parsedInstructions.forEach((instruction, index) => {
        if (instruction.type !== "instruction") {
            return;
        }

        const nodeId = `node-${index}`;

        const node = nodes.find(
            item => item.id === nodeId
        );

        if (node) {
            instructionNodes[instruction.id] = node;
        }
    });

    // --------------------------------
    // Position Start
    // --------------------------------

    const startNode = nodes.find(
        node => node.id === "start"
    );

    if (startNode) {
        startNode.position.x = CENTER_X;
        startNode.position.y = 0;
    }

    // --------------------------------
    // Position normal instructions
    // --------------------------------

    let y = 220;

    parsedInstructions.forEach((instruction) => {
        if (instruction.type !== "instruction") {
            return;
        }

        const node =
            instructionNodes[instruction.id];

        if (!node) {
            return;
        }

        node.position.x = CENTER_X;
        node.position.y = y;

        y += VERTICAL_SPACING;
    });

    // --------------------------------
    // Position branch targets
    // --------------------------------

    parsedInstructions.forEach((instruction) => {
        if (instruction.type !== "instruction") {
            return;
        }

        const branch = branchTable[instruction.id];

        if (!branch || branch.type !== "branch") {
            return;
        }

        const sourceNode =
            instructionNodes[instruction.id];

        if (!sourceNode) {
            return;
        }

        const branchY =
            sourceNode.position.y + BRANCH_SPACING;

        // --------------------------------
        // YES / TRUE target
        // --------------------------------
    console.log("LAYOUT BRANCH:", {
    instruction: instruction.id,
    trueTarget: branch.trueTarget,
    falseTarget: branch.falseTarget,
    sourceNode: sourceNode,
    });
        if (branch.trueTarget) {
            const targetNode =
                instructionNodes[branch.trueTarget];

            if (targetNode) {
                targetNode.position.x = LEFT_X;
                targetNode.position.y = branchY;
                console.log("MOVING TRUE TARGET:", {
                    target: branch.trueTarget,
                    node: targetNode,
                });
            }
        }

        // --------------------------------
        // NO / FALSE target
        // --------------------------------

        if (branch.falseTarget) {
            const targetNode =
                instructionNodes[branch.falseTarget];

            if (targetNode) {
                targetNode.position.x = RIGHT_X;
                targetNode.position.y = branchY;
            }
        }
    });

    // --------------------------------
    // Position End
    // --------------------------------

    const endNode = nodes.find(
        node => node.id === "end"
    );

    if (endNode) {
        const instructionPositions = nodes
            .filter(
                node =>
                    node.id !== "start" &&
                    node.id !== "end"
            )
            .map(node => node.position.y);

        const lowestY =
            instructionPositions.length > 0
                ? Math.max(...instructionPositions)
                : 220;

        endNode.position.x = CENTER_X;
        endNode.position.y = lowestY + 220;
    }

    return nodes;
}