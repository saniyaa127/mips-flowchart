import { tokenize } from "./tokenizer";

export function parse(code) {

    const lines = tokenize(code);

    console.log(lines);

    return lines;
}