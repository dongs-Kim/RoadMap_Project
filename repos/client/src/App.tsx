import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/login';
import Mypage from './Pages/Mypage/mypage';
import SignUp from './Pages/SignUp/signUp';
import Layout from './Components/Layout/layout';
import RoadMapList from './Pages/RoadMapList/roadmapList';
import RoadmapWrite from './Pages/RoadmapWrite/roadmapWrite';
import RoadmapView from './Pages/RoadmapView/roadmapView';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/roadmap/list/:category" element={<RoadMapList />} />
      </Route>
      <Route path="/roadmap/write" element={<RoadmapWrite />} />
      <Route path="/roadmap/view/:roadmapId" element={<RoadmapView />} />
    </Routes>
  );
}

export default App;
