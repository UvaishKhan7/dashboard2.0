import { Box, IconButton, Tooltip } from '@mui/material';
import { DeleteForeverOutlined, Edit, PreviewOutlined } from '@mui/icons-material';
import { useDeleteEmployeeQuery } from 'state/api';

const EmployeeActions = ({ params, rowId, setRowId }) => {


  return (
    <Box
      sx={{
        m: 1,
      }}
    >
      <Tooltip title="View Details">
        <IconButton >
          <PreviewOutlined />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit Details">
        <IconButton>
          <Edit />
        </IconButton>
      </Tooltip >
      <Tooltip title="Delete Details">
        <IconButton>
          <DeleteForeverOutlined />
        </IconButton>
      </Tooltip >
    </Box >
  );
};

export default EmployeeActions;