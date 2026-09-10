import { useRef, useState } from "react";
import { parse } from "./parser/parser";
import { generateFlowchart } from "./parser/flowchartGenerator";
import { buildLabelTable } from "./parser/labelTable";
import { resolveBranches } from "./parser/branchResolver";


import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import CodeEditor from "./components/CodeEditor";
import FlowchartCanvas from "./components/FlowchartCanvas";
// import ExplanationPanel from "./components/ExplanationPanel";

import "./index.css";

function App() {
  const starterCode = `main:
    li $t0, 5
    li $t1, 10
    add $t2, $t0, $t1
    li $v0, 10
    syscall`;

  const [mipsCode, setMipsCode] = useState(starterCode);
  
  const [flowchart, setFlowchart] = useState({
    nodes: [],
    edges: [],
});


 const fileInputRef = useRef(null);
  
 const handleOpen = () => {
    fileInputRef.current.click();
};
const handleFileSelected = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        setMipsCode(e.target.result);
    };

    reader.readAsText(file);
};

  const handleLoadExample = () => {
    setMipsCode(starterCode);
  };

const handleGenerate = () => {
  const parsed = parse(mipsCode);

  console.log("Parsed Instructions:", parsed);

  const labels = buildLabelTable(parsed);

  const branches = resolveBranches(parsed, labels);

  const chart = generateFlowchart(parsed, branches);

  setFlowchart(chart);
};

  const handleClear = () => {
    setMipsCode("");
  };

  return (
    <div className="app">
      <Header />
      <input
        type="file"
        accept=".asm,.txt"
        ref={fileInputRef}
        onChange={handleFileSelected}
        style={{ display: "none" }}
      />

      <Toolbar
        onOpen={handleOpen}
        onLoadExample={handleLoadExample}
        onGenerate={handleGenerate}
        onClear={handleClear}
      />

      <main className="workspace">
        <CodeEditor
            code={mipsCode}
            setCode={setMipsCode}
        />
       <FlowchartCanvas
         nodes={flowchart.nodes}
         edges={flowchart.edges}
        />
      </main>

      {/* <ExplanationPanel /> */}
    </div>
  );
}

export default App;
