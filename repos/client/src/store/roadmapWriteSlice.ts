import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection, Edge, Node, addEdge as flowAddEdge } from 'reactflow';
import shortUUID from 'short-uuid';
import _ from 'lodash';
import { EdgeData, RoadmapItem, RoadmapSetDto } from '../Interface/roadmap';
import { isEqualEdge, isEqualNode } from '../Utils/roadmap';

interface RoadmapWriteState {
  id: string;
  title: string;
  public: boolean;
  contents: string;
  nodes: Node<RoadmapItem>[];
  edges: Edge<EdgeData>[];
  category: string;
  thumbnail?: string;
  bgcolor?: string;
  contents_images?: string[];
  temp_images?: string[];
  history: { nodes: Node<RoadmapItem>[]; edges: Edge<EdgeData>[] }[];
  undoHistory: { nodes: Node<RoadmapItem>[]; edges: Edge<EdgeData>[] }[];
  clipboard: { nodes: Node<RoadmapItem>[]; edges: Edge<EdgeData>[] } | null;
}

const getInitialNodes = (): Node<RoadmapItem>[] => [
  {
    id: shortUUID.generate(),
    type: 'startNode',
    data: { name: '시작', description: '', bgcolor: '#ffffff', border: true },
    position: { x: 100, y: 50 },
    zIndex: 0,
  },
];

const getInitialState = (): RoadmapWriteState => ({
  id: shortUUID.generate(),
  title: '',
  public: true,
  category: '',
  contents: '',
  bgcolor: '#d9e3f0',
  nodes: getInitialNodes(),
  edges: [],
  history: [],
  undoHistory: [],
  clipboard: null,
});

export const getRoadmap = createAsyncThunk<RoadmapSetDto, { id: string }>(
  'roadmapWrite/getRoadmap',
  async ({ id }, thunkApi) => {
    try {
      const { data } = await axios.get<RoadmapSetDto>(`/api/roadmaps/${id}`);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

const roadmapWriteSlice = createSlice({
  name: 'roadmapWrite',
  initialState: getInitialState(),
  reducers: {
    setRoadmap: (state, action: PayloadAction<RoadmapSetDto>) => {
      const { roadmap, nodes, edges } = action.payload;
      state.id = roadmap.id || shortUUID.generate();
      state.title = roadmap.title;
      state.public = roadmap.public;
      state.contents = roadmap.contents;
      state.category = roadmap.category;
      state.thumbnail = roadmap.thumbnail;
      state.bgcolor = roadmap.bgcolor;
      state.contents_images = roadmap.contents_images;
      state.nodes = nodes;
      state.edges = edges;
      state.history = [];
      state.undoHistory = [];
      state.clipboard = null;
    },
    clearRoadmap: (state) => {
      _.extend(state, getInitialState());
      state.thumbnail = undefined;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setPublic: (state, action: PayloadAction<boolean>) => {
      state.public = action.payload;
    },
    setContents: (state, action: PayloadAction<string>) => {
      state.contents = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setThumbnail: (state, action: PayloadAction<string | undefined>) => {
      state.thumbnail = action.payload;
    },
    setBgcolor: (state, action: PayloadAction<string | undefined>) => {
      state.bgcolor = action.payload;
    },
    setNodes: (state, action: PayloadAction<Node<RoadmapItem>[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge<EdgeData>[]>) => {
      state.edges = action.payload;
    },
    addNode: (state, action: PayloadAction<Node<RoadmapItem>>) => {
      state.nodes.push(action.payload);
    },
    addEdge: (state, action: PayloadAction<Edge<EdgeData>>) => {
      state.edges.push(action.payload);
    },
    addEdgeByConnection: (state, action: PayloadAction<Connection>) => {
      state.edges = flowAddEdge(action.payload, state.edges);
    },
    updateNode: (state, action: PayloadAction<{ id: string; data: RoadmapItem }>) => {
      const node = state.nodes.find((node) => node.id === action.payload.id);
      if (node) {
        node.data = action.payload.data;
      }
    },
    updateEdge: (state, action: PayloadAction<{ id: string; data: EdgeData }>) => {
      const edge = state.edges.find((edge) => edge.id === action.payload.id);
      if (edge) {
        edge.data = action.payload.data;
      }
    },
    addHistory: (state) => {
      const { nodes, edges } = state;
      const { nodes: lastNodes, edges: lastEdges } = state.history[state.history.length - 1] ?? {};

      // 변경내역이 있는지 확인
      if (
        nodes.length === lastNodes?.length &&
        nodes.every((node, i) => isEqualNode(node, lastNodes[i])) &&
        edges.length === lastEdges?.length &&
        edges.every((edge, i) => isEqualEdge(edge, lastEdges[i]))
      ) {
        return;
      }

      //여태까지 실행취소한 이력은 삭제되고 새로운 이력이 쌓인다. 복구 불가함
      state.undoHistory = [];

      //이력 10개 제한
      if (state.history.length >= 10) {
        state.history = state.history.slice(state.history.length - 9, state.history.length);
      }
      state.history.push({ nodes: state.nodes, edges: state.edges });
    },
    undoHistory: (state) => {
      const last = state.history.pop();
      if (last) {
        state.undoHistory.push(last);
      }
    },
    redoHistory: (state) => {
      const last = state.undoHistory.pop();
      if (last) {
        state.history.push(last);
      }
    },
    setClipboard: (state) => {
      const selectedNodes = state.nodes.filter((node) => node.selected);
      const selectedEdges = state.edges.filter((edge) => edge.selected);
      if (!selectedNodes.length && !selectedEdges.length) {
        return;
      }
      state.clipboard = { nodes: selectedNodes, edges: selectedEdges };
    },
    addRoadmapTempImage: (state, action: PayloadAction<string>) => {
      state.temp_images = [...(state.temp_images ?? []), action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoadmap.fulfilled, (state, action) => {
      const { roadmap, nodes, edges } = action.payload;
      state.id = roadmap.id as string;
      state.title = roadmap.title;
      state.public = roadmap.public;
      state.contents = roadmap.contents;
      state.category = roadmap.category;
      state.thumbnail = roadmap.thumbnail;
      state.bgcolor = roadmap.bgcolor;
      state.contents_images = roadmap.contents_images;
      state.nodes = nodes.map((node) => {
        if (node.width) {
          node.style = node.style ?? {};
          node.style.width = node.width;
        } else {
          delete node.width;
        }
        if (node.height) {
          node.style = node.style ?? {};
          node.style.height = node.height;
        } else {
          delete node.height;
        }
        return node;
      });
      state.edges = edges;
      state.history = [];
      state.undoHistory = [];
      state.clipboard = null;
    });
  },
});

export const {
  setRoadmap,
  clearRoadmap,
  setTitle,
  setPublic,
  setContents,
  setCategory,
  setThumbnail,
  setBgcolor,
  setNodes,
  setEdges,
  addNode,
  addEdge,
  addEdgeByConnection,
  updateNode,
  updateEdge,
  addHistory,
  undoHistory,
  redoHistory,
  setClipboard,
  addRoadmapTempImage,
} = roadmapWriteSlice.actions;

export default roadmapWriteSlice.reducer;
