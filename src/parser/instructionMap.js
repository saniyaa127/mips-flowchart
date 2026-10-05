export const instructionMap = {

    // ========================================
    // Arithmetic
    // ========================================

    add: {
        category: "arithmetic",
        shape: "process",
        description: "Adds two registers"
    },

    addi: {
        category: "arithmetic",
        shape: "process",
        description: "Adds an immediate value"
    },

    addiu: {
        category: "arithmetic",
        shape: "process",
        description: "Adds an immediate value unsigned"
    },

    addu: {
        category: "arithmetic",
        shape: "process",
        description: "Adds two registers unsigned"
    },

    sub: {
        category: "arithmetic",
        shape: "process",
        description: "Subtracts two registers"
    },

    subu: {
        category: "arithmetic",
        shape: "process",
        description: "Subtracts two registers unsigned"
    },

    mul: {
        category: "arithmetic",
        shape: "process",
        description: "Multiplies two values"
    },

    mult: {
        category: "arithmetic",
        shape: "process",
        description: "Multiplies two registers"
    },

    multu: {
        category: "arithmetic",
        shape: "process",
        description: "Multiplies two registers unsigned"
    },

    div: {
        category: "arithmetic",
        shape: "process",
        description: "Divides two registers"
    },


    // ========================================
    // Logical
    // ========================================

    and: {
        category: "logical",
        shape: "process",
        description: "Bitwise AND"
    },

    or: {
        category: "logical",
        shape: "process",
        description: "Bitwise OR"
    },

    ori: {
        category: "logical",
        shape: "process",
        description: "OR with immediate value"
    },

    xor: {
        category: "logical",
        shape: "process",
        description: "Bitwise XOR"
    },

    nor: {
        category: "logical",
        shape: "process",
        description: "Bitwise NOR"
    },


    // ========================================
    // Shift
    // ========================================

    sll: {
        category: "shift",
        shape: "process",
        description: "Shift left logical"
    },

    srl: {
        category: "shift",
        shape: "process",
        description: "Shift right logical"
    },

    sra: {
        category: "shift",
        shape: "process",
        description: "Shift right arithmetic"
    },


    // ========================================
    // Load / Store
    // ========================================

    li: {
        category: "load",
        shape: "process",
        description: "Load immediate"
    },

    lui: {
        category: "load",
        shape: "process",
        description: "Load upper immediate"
    },

    lw: {
        category: "memory",
        shape: "process",
        description: "Load word"
    },

    sw: {
        category: "memory",
        shape: "process",
        description: "Store word"
    },


    // ========================================
    // Set / Compare
    // ========================================

    slti: {
        category: "comparison",
        shape: "process",
        description: "Set less than immediate"
    },

    equal: {
        category: "comparison",
        shape: "process",
        description: "Compare values for equality"
    },


    // ========================================
// Branches
// ========================================

beq: {
    category: "branch",
    shape: "decision",
    controlFlow: "conditional",
    targetOperand: 2,
    description: "Branch if equal"
},

bne: {
    category: "branch",
    shape: "decision",
    controlFlow: "conditional",
    targetOperand: 2,
    description: "Branch if not equal"
},

blt: {
    category: "branch",
    shape: "decision",
    controlFlow: "conditional",
    targetOperand: 2,
    description: "Branch if less than"
},

// ========================================
// Jumps
// ========================================

j: {
    category: "jump",
    shape: "jump",
    controlFlow: "unconditional",
    targetOperand: 0,
    description: "Jump to label"
},

jal: {
    category: "jump",
    shape: "jump",
    controlFlow: "call",
    targetOperand: 0,
    description: "Jump and link"
},

jr: {
    category: "jump",
    shape: "jump",
    controlFlow: "return",
    description: "Jump register"
},
    // ========================================
    // Special / System
    // ========================================

    syscall: {
        category: "system",
        shape: "terminal",
        description: "System call"
    },


    // ========================================
    // MIPS-style pseudo/control markers
    // ========================================

    while: {
        category: "control",
        shape: "decision",
        description: "Beginning of a while loop"
    },

    endwhile: {
        category: "control",
        shape: "process",
        description: "End of a while loop"
    },

    endpush: {
        category: "control",
        shape: "process",
        description: "End of push operation"
    },

    endpop: {
        category: "control",
        shape: "process",
        description: "End of pop operation"
    }
};