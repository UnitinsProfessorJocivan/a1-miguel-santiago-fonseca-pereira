import type { Node } from './MindMap';

interface ConnectionsProps {
  nodes: Node[];
}

export function Connections({ nodes }: ConnectionsProps) {
  const connections = nodes
    .filter(node => node.parentId)
    .map(node => {
      const parent = nodes.find(n => n.id === node.parentId);
      if (!parent) return null;

      return { from: parent, to: node };
    })
    .filter(Boolean);

  return (
    <g>
      {connections.map((connection, index) => {
        if (!connection) return null;
        
        const { from, to } = connection;
        
        // Calculate control points for a smooth curved line
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        
        // Create a curved path
        const path = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;

        return (
          <g key={`${from.id}-${to.id}-${index}`}>
            {/* Shadow line */}
            <path
              d={path}
              fill="none"
              stroke="#000"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.1"
            />
            {/* Main line */}
            <path
              d={path}
              fill="none"
              stroke={to.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Animated gradient line overlay */}
            <path
              d={path}
              fill="none"
              stroke={to.color}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.8"
              strokeDasharray="5,5"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="10"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        );
      })}
    </g>
  );
}
