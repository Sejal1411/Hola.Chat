import { useState } from 'react';
import Conversations from './Conversations';
import SideHeader from './SideHeader';
import SideSearch from './SideSearch';

const SideBar = () => {

  return (
    <aside>
      <SideHeader />
      <SideSearch />
      <Conversations />
    </aside>
  );
};

export default SideBar;