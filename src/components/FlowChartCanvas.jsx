import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

import { DecisionNode } from "./DecisionNode";

const nodeTypes = {
    decision: DecisionNode,
};

function FlowchartCanvas({ nodes, edges }) {
    return (
        <section>
            <h2>Flowchart Viewer</h2>

            <div
                style={{
                    width: "100%",
                    height: "calc(100vh - 100px)",
                    overflow: "hidden",
                }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}

                    fitView

                    fitViewOptions={{
                        padding: 0.15,
                        minZoom: 0.2,
                        maxZoom: 1,
                    }}

                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    zoomOnDoubleClick={false}

                    panOnScroll={false}
                    panOnDrag={false}
                />
            </div>
        </section>
    );
}

export default FlowchartCanvas;