import { Handle, Position } from "reactflow";

export function DecisionNode({ data }) {
    const lines = data.label.split("\n");

    return (
        <div
            style={{
                width: "360px",
                height: "220px",
                position: "relative",
            }}
        >
            <svg
                width="360"
                height="220"
                viewBox="0 0 360 220"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            >
                {/* Diamond */}
                <polygon
                    points="180,5 355,110 180,215 5,110"
                    fill="white"
                    stroke="black"
                    strokeWidth="3"
                />

                {/* Decision text */}
                <text
                    x="180"
                    y={lines.length > 1 ? "100" : "110"}
                    textAnchor="middle"
                    fill="black"
                    fontSize="30"
                    fontWeight="bold"
                >
                    {lines.map((line, index) => (
                        <tspan
                            key={index}
                            x="180"
                            dy={index === 0 ? "0" : "28"}
                        >
                            {line}
                        </tspan>
                    ))}
                </text>
            </svg>

            {/* Incoming connection */}
            <Handle
                type="target"
                position={Position.Top}
            />

            {/* Yes branch */}
            <Handle
                type="source"
                position={Position.Left}
                id="yes"
            />

            {/* No branch */}
            <Handle
                type="source"
                position={Position.Right}
                id="no"
            />
        </div>
    );
}