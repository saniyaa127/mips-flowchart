import { useState } from "react";

import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import CodeEditor from "./components/CodeEditor";
import FlowchartCanvas from "./components/FlowchartCanvas";
import ExplanationPanel from "./components/ExplanationPanel";

import "./index.css";

function App() {
  const starterCode = `main:
    li $t0, 5
    li $t1, 10
    add $t2, $t0, $t1
    li $v0, 10
    syscall`;

  const [mipsCode, setMipsCode] = useState(starterCode);

  const handleOpen = () => {
    alert("Open File coming in Phase 2!");
  };

  const handleLoadExample = () => {
    setMipsCode(starterCode);
  };

  const handleGenerate = () => {
    alert("Flowchart generation coming in Phase 3!");
  };

  const handleClear = () => {
    setMipsCode("");
  };

  return (
    <div className="app">
      <Header />

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
        <FlowchartCanvas />
      </main>

      <ExplanationPanel />
    </div>
  );
}

export default App;
