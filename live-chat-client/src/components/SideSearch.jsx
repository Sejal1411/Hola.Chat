import { Search } from '@mui/icons-material';
import { TextField } from '@mui/material';

const SideSearch = () => {
  return (
    <TextField
      className='side-search'
      variant='filled'
      fullWidth
      placeholder='Search'
      hiddenLabel
      Input={{
        startAdornment: <Search />,
        className: 'input',
      }}
    />
  );
};

export default SideSearch;