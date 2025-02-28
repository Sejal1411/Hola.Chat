import { Avatar, IconButton } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import logo from "/chat1.png";

const Groups = () => {
  return (
    <div className="users-list">
        
      <div className="ug-header">
        <img src={logo} style={{height: "1.5rem",  width: "1.5rem"}} 
        />
        <p className="ug-title">Available Groups</p>
      </div>

      <div className="sb-search">
        <IconButton>
            <SearchIcon />
        </IconButton>
        <input type="Search" className="search-box" />
      </div>

      <div className="ug-list"> 
        <div className="list-item">
          <Avatar className='avatar' />
          <p className="title">Test User</p>
        </div> 
        <div className="list-item">
          <Avatar className='avatar' />
          <p className="title">Test User</p>
        </div>
      </div>

    </div>
  )
}

export default Groups