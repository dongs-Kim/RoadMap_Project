import { Edge, Node } from 'reactflow';
import { EdgeData, RoadmapItem } from '../Interface/roadmap';

export function downloadImage(dataUrl: string) {
  const a = document.createElement('a');
  a.setAttribute('download', 'roadmap.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

export function isEqualNode(nodeA: Node<RoadmapItem>, nodeB: Node<RoadmapItem>) {
  if (nodeA.width !== nodeB.width) {
    return false;
  }
  if (nodeA.height !== nodeB.height) {
    return false;
  }
  if (nodeA.id !== nodeB.id) {
    return false;
  }
  if (nodeA.data.name !== nodeB.data.name) {
    return false;
  }
  if (nodeA.data.description !== nodeB.data.description) {
    return false;
  }
  if (nodeA.data.bgcolor !== nodeB.data.bgcolor) {
    return false;
  }
  if (nodeA.data.border !== nodeB.data.border) {
    return false;
  }
  if (nodeA.data.required !== nodeB.data.required) {
    return false;
  }
  if (nodeA.data.status !== nodeB.data.status) {
    return false;
  }
  if (nodeA.data.url !== nodeB.data.url) {
    return false;
  }
  if (nodeA.position.x !== nodeB.position.x) {
    return false;
  }
  if (nodeA.position.y !== nodeB.position.y) {
    return false;
  }
  if (nodeA.type !== nodeB.type) {
    return false;
  }
  if (nodeA.zIndex !== nodeB.zIndex) {
    return false;
  }
  return true;
}

export function isEqualEdge(edgeA: Edge<EdgeData>, edgeB: Edge<EdgeData>) {
  if (edgeA.id !== edgeB.id) {
    return false;
  }
  if (edgeA.source !== edgeB.source) {
    return false;
  }
  if (edgeA.sourceHandle !== edgeB.sourceHandle) {
    return false;
  }
  if (edgeA.target !== edgeB.target) {
    return false;
  }
  if (edgeA.type !== edgeB.type) {
    return false;
  }
  if (edgeA.data?.color !== edgeB.data?.color) {
    return false;
  }
  if (edgeA.data?.lineType !== edgeB.data?.lineType) {
    return false;
  }
  return true;
}
