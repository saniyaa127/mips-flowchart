export function createProcessNode(instruction, id, y) {
    return {
        id,

        position: {
            x: 300,
            y,
        },

        data: {
            label: `${instruction.opcode} ${instruction.operands.join(", ")}`,
        },

        type: "default",

        style: {
            width: 360,
            height: 120,
            fontSize: 30,
            fontWeight: "bold",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px",
            boxSizing: "border-box",
        },
    };
}