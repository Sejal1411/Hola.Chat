import ChatArea from './ChatArea';
import SideBar from './SideBar';
import Welcome from './Welcome';
import CreateGroups from './CreateGroups';
import { Outlet } from 'react-router-dom';
import Groups from './Groups';


const Main = () => {
  return (
    <main>
      <SideBar />
      <Outlet />
      {/* <CreateGroups /> */}
      {/* <Welcome /> */}
      {/* <ChatArea /> */}
      {/* <Groups /> */}
    </main>
  );
};

export default Main;