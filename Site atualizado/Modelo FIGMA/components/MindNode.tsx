import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import type { Node } from './MindMap';

interface MindNodeProps {
  node: Node;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (id: string, updates: Partial<Node>) => void;
  onAddChild: (parentId: string) => void;
  onDelete: (id: string) => void;
  availableColors: string[];
}

export function MindNode({
  node,
  isSelected,
  onSelect,
  onUpdate,
  onAddChild,
  onDelete,
  availableColors,
}: MindNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(node.text);
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0, nodeX: 0, nodeY: 0 });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) return;
    
    e.stopPropagation();
    onSelect();
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      nodeX: node.x,
      nodeY: node.y,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      
      onUpdate(node.id, {
        x: dragStartPos.current.nodeX + dx,
        y: dragStartPos.current.nodeY + dy,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, node.id, onUpdate]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddChild(node.id);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(node.id);
  };

  const handleTextClick = (e: React.MouseEvent) => {
    if (!isDragging) {
      e.stopPropagation();
      setIsEditing(true);
    }
  };

  const handleTextSubmit = () => {
    onUpdate(node.id, { text: editText });
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTextSubmit();
    } else if (e.key === 'Escape') {
      setEditText(node.text);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      ref={nodeRef}
      className="absolute"
      style={{
        left: node.x,
        top: node.y,
        x: '-50%',
        y: '-50%',
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div
        className={`relative group cursor-move ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
      >
        <div
          className={`relative rounded-xl px-6 py-4 shadow-lg transition-all duration-200 min-w-[120px] ${
            isSelected ? 'ring-4 ring-offset-2 ring-offset-white' : ''
          }`}
          style={{
            backgroundColor: node.color,
            ringColor: node.color,
          }}
        >
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleTextSubmit}
              onKeyDown={handleKeyDown}
              className="bg-white/90 text-slate-900 px-2 py-1 rounded outline-none min-w-[100px]"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div
              onClick={handleTextClick}
              className="text-white select-none text-center"
            >
              {node.text}
            </div>
          )}

          {isSelected && !isEditing && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-2"
            >
              <Button
                size="sm"
                variant="secondary"
                className="shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddChild(node.id);
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Palette className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="grid grid-cols-4 gap-2">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                          node.color === color ? 'ring-2 ring-offset-2 ring-slate-900' : ''
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => onUpdate(node.id, { color })}
                      />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
