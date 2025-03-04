import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import Welcome from './components/Welcome';
import ChatArea from './components/ChatArea';
import CreateGroups from './components/CreateGroups';
import Groups from './components/Groups';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="app" element={<Main />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="chats" element={<ChatArea />} />
          <Route path="create-groups" element={<CreateGroups />} />
          <Route path="groups" element={<Groups />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;