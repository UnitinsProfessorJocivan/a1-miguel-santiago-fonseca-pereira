import { useState, useRef, useCallback } from 'react';
import { MindNode } from './MindNode';
import { Connections } from './Connections';

export interface Node {
  id: string;
  text: string;
  color: string;
  x: number;
  y: number;
  parentId: string | null;
}

const COLORS = [
  '#8B5CF6', // purple
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#6366F1', // indigo
];

export function MindMap() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: '1',
      text: 'Ideia Central',
      color: '#8B5CF6',
      x: 400,
      y: 300,
      parentId: null,
    },
  ]);
  
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const addChildNode = useCallback((parentId: string) => {
    const parent = nodes.find(n => n.id === parentId);
    if (!parent) return;

    const children = nodes.filter(n => n.parentId === parentId);
    const angle = children.length * (Math.PI / 4) - Math.PI / 2;
    const distance = 180;
    
    const newNode: Node = {
      id: Date.now().toString(),
      text: 'Novo Nó',
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      x: parent.x + Math.cos(angle) * distance,
      y: parent.y + Math.sin(angle) * distance,
      parentId,
    };

    setNodes([...nodes, newNode]);
    setSelectedNodeId(newNode.id);
  }, [nodes]);

  const updateNode = useCallback((id: string, updates: Partial<Node>) => {
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, ...updates } : node
    ));
  }, [nodes]);

  const deleteNode = useCallback((id: string) => {
    // Don't delete the root node
    const node = nodes.find(n => n.id === id);
    if (!node || !node.parentId) return;

    // Delete the node and all its descendants
    const toDelete = new Set([id]);
    let changed = true;
    
    while (changed) {
      changed = false;
      nodes.forEach(n => {
        if (n.parentId && toDelete.has(n.parentId) && !toDelete.has(n.id)) {
          toDelete.add(n.id);
          changed = true;
        }
      });
    }

    setNodes(nodes.filter(n => !toDelete.has(n.id)));
    if (selectedNodeId && toDelete.has(selectedNodeId)) {
      setSelectedNodeId(null);
    }
  }, [nodes, selectedNodeId]);

  const handleContainerDoubleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const newNode: Node = {
        id: Date.now().toString(),
        text: 'Novo Nó',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        parentId: null,
      };

      setNodes([...nodes, newNode]);
      setSelectedNodeId(newNode.id);
    }
  }, [nodes]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[calc(100vh-200px)] bg-white rounded-lg shadow-lg overflow-hidden border-2 border-slate-200"
      onDoubleClick={handleContainerDoubleClick}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <Connections nodes={nodes} />
      </svg>
      
      {nodes.map(node => (
        <MindNode
          key={node.id}
          node={node}
          isSelected={selectedNodeId === node.id}
          onSelect={() => setSelectedNodeId(node.id)}
          onUpdate={updateNode}
          onAddChild={addChildNode}
          onDelete={deleteNode}
          availableColors={COLORS}
        />
      ))}

      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border">
        <h3 className="mb-2">Instruções:</h3>
        <ul className="space-y-1 text-slate-700">
          <li>• Clique em um nó para selecioná-lo</li>
          <li>• Arraste os nós para reposicioná-los</li>
          <li>• Duplo clique em um nó para adicionar filho</li>
          <li>• Clique direito para excluir</li>
          <li>• Edite o texto clicando nele</li>
        </ul>
      </div>
    </div>
  );
}
