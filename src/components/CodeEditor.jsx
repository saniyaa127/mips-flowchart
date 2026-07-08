function CodeEditor({ code, setCode }) {
  return (
    <section className="panel">
      <h2>Code Editor</h2>

      <textarea
        className="code-editor"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        placeholder="Paste your MIPS Assembly code here..."
      />
    </section>
  );
}

export default CodeEditor;