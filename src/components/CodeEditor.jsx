function CodeEditor() {
  return (
    <section className="panel">
      <h2>Code Editor</h2>

      <textarea
        className="code-editor"
        placeholder="Paste your MIPS Assembly code here..."
        defaultValue={`main:
    li $t0, 5
    li $t1, 10
    add $t2, $t0, $t1
    li $v0, 10
    syscall`}
      />
    </section>
  );
}

export default CodeEditor;