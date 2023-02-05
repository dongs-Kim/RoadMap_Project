import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/login';
import Mypage from './Pages/Mypage/mypage';
import SignUp from './Pages/SignUp/signUp';
import Layout from './Components/Layout/layout';
import RoadMapList from './Pages/RoadMapList/roadmapList';
import RoadmapWrite from './Pages/RoadmapWrite/roadmapWrite';
import RoadmapView from './Pages/RoadmapView/roadmapView';
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/Roadmap/list" element={<RoadMapList />} />
        <Route path="/Roadmap/list/:category" element={<RoadMapList />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Mypage" element={<Mypage />} />
      </Route>
      <Route path="/Roadmap/write">
        <Route index element={<RoadmapWrite />} />
        <Route path=":roadmapId" element={<RoadmapWrite />} />
      </Route>
      <Route path="/Roadmap/view/:roadmapId" element={<RoadmapView />} />
    </Routes>
  );
}

export default App;
