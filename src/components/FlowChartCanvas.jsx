import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

function FlowchartCanvas({ nodes, edges }) {
    return (
        <section className="panel">
            <h2>Flowchart Viewer</h2>

            <div style={{ height: "500px" }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    fitView
                />
            </div>
        </section>
    );
}

export default FlowchartCanvas;