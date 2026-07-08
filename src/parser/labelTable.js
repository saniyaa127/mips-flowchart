export function buildLabelTable(parsedInstructions) {
  const labels = {};

  for (let i = 0; i < parsedInstructions.length; i++) {
    const current = parsedInstructions[i];

    console.log("Current:", current);

    if (current.type !== "label") {
      continue;
    }

    console.log("Found label:", current.name);

    for (let j = i + 1; j < parsedInstructions.length; j++) {
      console.log("Checking:", parsedInstructions[j]);

      if (parsedInstructions[j].type === "instruction") {
        labels[current.name] = parsedInstructions[j].id;
        break;
      }
    }
  }

  console.log("Final Label Table:", labels);

  return labels;
}