import {
  FaFolderOpen,
  FaBook,
  FaProjectDiagram,
  FaTrash,
} from "react-icons/fa";

function Toolbar({
  onOpen,
  onLoadExample,
  onGenerate,
  onClear,
}) {
  return (
    <div className="toolbar">

      <button onClick={onOpen}>
        <FaFolderOpen />
        Open File
      </button>

      <button onClick={onLoadExample}>
        <FaBook />
        Load Example
      </button>

      <button className="generate-button" onClick={onGenerate}>
        <FaProjectDiagram />
        Generate Flowchart
      </button>

      <button onClick={onClear}>
        <FaTrash />
        Clear
      </button>

    </div>
  );
}

export default Toolbar;