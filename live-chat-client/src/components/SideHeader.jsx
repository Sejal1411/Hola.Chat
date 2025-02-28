import { Grid, Avatar, ButtonGroup, IconButton } from '@mui/material';
import {
  DarkMode,
  PersonAddAlt1,
  GroupAdd,
  AddCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { toggleTheme } from "/Features/themeSlice";

const SideHeader = () => {
 const navigate =  useNavigate();
 const dispatch =  useDispatch();
 const [lightTheme, setLightTheme] = useState(true);
useSelector((state) => state.themeKey);

  return (
    <Grid container className={'side-header' + (lightTheme ?"" : " dark")}>
      <Avatar className='avatar' />
      <ButtonGroup>

        <IconButton onClick={() => {
          navigate("users");
        }}>
          <PersonAddAlt1 className={(lightTheme ?"" : " dark")}/>
        </IconButton>

        <IconButton onClick={() => {
          navigate("groups")
        }}>
          <GroupAdd className={(lightTheme ?"" : " dark")}/>
        </IconButton>

        <IconButton onClick={() => {
          navigate("create-groups")
        }}>
          <AddCircle className={(lightTheme ?"" : " dark")}/>
        </IconButton>

        <IconButton onClick={()=> {
          setLightTheme((prevValue) => {
            return !prevValue;
          });
        }}>
          {lightTheme && <DarkMode />}
          {!lightTheme && <LightModeIcon />}
        </IconButton>

      </ButtonGroup>
    </Grid>
  );
};

export default SideHeader;