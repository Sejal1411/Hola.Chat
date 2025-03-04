import  CheckCircleIcon from '@mui/icons-material/CheckCircle';
import  {  IconButton } from '@mui/material';

const CreateGroups = () => {
  return (
    <div className="createGroups-container"> 
      <input placeholder='Enter Group Name' className='search-box'  />
      <IconButton>
       <CheckCircleIcon />
      </IconButton> 
    </div>
  )
}

export default CreateGroups