import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import FlowchartCanvas from "./components/FlowchartCanvas";
import ExplanationPanel from "./components/ExplanationPanel";

import "./index.css";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="workspace">
        <CodeEditor />
        <FlowchartCanvas />
      </main>

      <ExplanationPanel />
    </div>
  );
}

export default App;