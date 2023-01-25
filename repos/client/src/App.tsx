import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/login';
import Mypage from './Pages/Mypage/mypage';
import UserInfo from './Pages/UserInfo/userInfo';
import SignUp from './Pages/SignUp/signUp';
import Layout from './Components/Layout/layout';
import RoadMapList from './Pages/RoadMapList/roadmapList';
import RoadmapWrite from './Pages/RoadmapWrite/roadmapWrite';
import RoadmapView from './Pages/RoadmapView/roadmapView';

function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Userinfo" element={<UserInfo />} />
        <Route path="/Roadmap/list/:category" element={<RoadMapList />} />
      </Route>
      <Route path="/Roadmap/write" element={<RoadmapWrite />} />
      <Route path="/Roadmap/view/:roadmapId" element={<RoadmapView />} />
    </Routes>
  );
}

export default App;
