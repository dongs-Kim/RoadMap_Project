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
import FavoriteList from './Pages/Faivorte/FavoriteList';
import { ConfirmTerms } from './Pages/SignUp/confirmTerms';
import UserRoadMapList from './Pages/UserRoadmapList/userRoadmapList';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { LearnResourceWrite } from './Pages/LearnResourceWrite/LearnResourceWrite';
import { LearnResourceView } from './Pages/LearnResourceView/LearnResourceView';
import { MyLearnResource } from './Pages/MyLearnResource/MyLearnResource';
import { LearnResourceListContainer } from './Pages/LearnResourceListContainer/LearnResourceListContainer';

dayjs.extend(relativeTime);
dayjs.locale('ko');

function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/ConfirmTerms" element={<ConfirmTerms />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/Roadmap/list/:category" element={<RoadMapList />} />
        <Route path="/Roadmap/User/:id" element={<UserRoadMapList />} />
        <Route path="/Favorite/list/:id" element={<FavoriteList />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/MyLearnResource" element={<MyLearnResource />} />
        <Route path="/Roadmap/view/:roadmapId" element={<RoadmapView />} />
        <Route path="/LearnResource/write">
          <Route index element={<LearnResourceWrite />} />
          <Route path=":id" element={<LearnResourceWrite />} />
        </Route>
        <Route path="/LearnResource/list" element={<LearnResourceListContainer />} />
        <Route path="/LearnResource/view/:id" element={<LearnResourceView />} />
      </Route>
      <Route path="/Roadmap/write">
        <Route index element={<RoadmapWrite />} />
        <Route path=":roadmapId" element={<RoadmapWrite />} />
      </Route>
    </Routes>
  );
}

export default App;
