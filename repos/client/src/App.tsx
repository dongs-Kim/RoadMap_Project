import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './Pages/Login/login';
import Mypage from './Pages/Mypage/mypage';
import UserInfo from './Pages/UserInfo/userInfo';
import SignUp from './Pages/SignUp/signUp';
import Layout from './Components/Layout/layout';
import RoadMapList from './Pages/RoadMapList/roadmapList';
import RoadmapWrite from './Pages/RoadmapWrite/RoadmapWrite';
import RoadmapView from './Pages/RoadmapView/roadmapView';
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Mypage" element={<Mypage />} />
          <Route path="/Userinfo" element={<UserInfo />} />
          <Route path="/Roadmap/list/:category" element={<RoadMapList />} />
        </Route>
        <Route path="/Roadmap/write">
          <Route index element={<RoadmapWrite />} />
          <Route path=":roadmapId" element={<RoadmapWrite />} />
        </Route>
        <Route path="/Roadmap/view/:roadmapId" element={<RoadmapView />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
