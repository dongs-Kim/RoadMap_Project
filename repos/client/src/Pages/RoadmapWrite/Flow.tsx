import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, Connection } from 'reactflow';
import shortUUID from 'short-uuid';
import { AddNodeDrop } from './AddNodeDrop';
import { RoadmapItemNode } from './RoadmapItemNode';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  { id: '3', position: { x: 300, y: 300 }, data: { label: '3' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({ roadmapItem: RoadmapItemNode }), []);
  const onConnect = useCallback((params: Connection) => setEdges((eds: any) => addEdge(params, eds)), [setEdges]);

  //----------------
  // 항목 생성
  //----------------
  const [itemName, setItemName] = useState('');
  const onChangeItemName = (e: ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };
  const onClickItemCreate = () => {
    if (!itemName) {
      alert('항목 이름을 입력해 주세요');
      return;
    }
    const item = { id: shortUUID.generate(), type: 'roadmapItem', position: { x: 0, y: 0 }, data: { label: itemName } };
    setNodes((ns) => ns.concat(item));
  };

  return (
    <div>
      <div>
        <h3>항목 생성</h3>
        <div>
          <label>이름</label>
          <input type="text" value={itemName} onChange={onChangeItemName}></input>
        </div>
        <button onClick={onClickItemCreate}>생성</button>
      </div>
      <div style={{ height: 800 }}>
        <AddNodeDrop />
      </div>
    </div>
  );
};
