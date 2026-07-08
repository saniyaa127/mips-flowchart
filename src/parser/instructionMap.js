export const instructionMap = {
  // Arithmetic
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

  sub: {
    category: "arithmetic",
    shape: "process",
    description: "Subtracts two registers"
  },

  // Load / Store
  li: {
    category: "load",
    shape: "process",
    description: "Load immediate"
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

  // Branches
  beq: {
    category: "branch",
    shape: "decision",
    description: "Branch if equal"
  },

  bne: {
    category: "branch",
    shape: "decision",
    description: "Branch if not equal"
  },

  // Jumps
  j: {
    category: "jump",
    shape: "jump",
    description: "Jump"
  },

  jal: {
    category: "jump",
    shape: "jump",
    description: "Jump and link"
  },

  jr: {
    category: "jump",
    shape: "jump",
    description: "Jump register"
  },

  syscall: {
    category: "system",
    shape: "terminal",
    description: "System call"
  }
};