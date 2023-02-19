import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection, Edge, Node, addEdge as flowAddEdge } from 'reactflow';
import shortUUID from 'short-uuid';
import _ from 'lodash';
import { EdgeData, RoadmapItem, RoadmapSetDto } from '../Interface/roadmap';

interface RoadmapWriteState {
  id: string;
  title: string;
  public: boolean;
  contents: string;
  nodes: Node<RoadmapItem>[];
  edges: Edge<EdgeData>[];
  category: string;
  thumbnail?: string;
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
  nodes: getInitialNodes(),
  edges: [],
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
      state.nodes = nodes;
      state.edges = edges;
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
  setNodes,
  setEdges,
  addNode,
  addEdge,
  addEdgeByConnection,
  updateNode,
  updateEdge,
} = roadmapWriteSlice.actions;

export default roadmapWriteSlice.reducer;
