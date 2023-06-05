import { useState } from 'react';
import {
  DataGrid,
  GridToolbar,
  // GridToolbarContainer,
  // GridToolbarExport,
  // GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';




const AddRowDialog = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ id: '', firstName: '', lastName: '', age: '', email: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    onAdd(formData);
    setFormData({ id: '', firstName: '', lastName: '', age: '', email: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Row</DialogTitle>
      <DialogContent>
        <TextField name="id" label="ID" value={formData.id} onChange={handleInputChange} fullWidth margin="dense" />
        <TextField name="firstName" label="First Name" value={formData.firstName} onChange={handleInputChange} fullWidth margin="dense" />
        <TextField name="lastName" label="Last Name" value={formData.lastName} onChange={handleInputChange} fullWidth margin="dense" />
        <TextField name="age" label="Age" value={formData.age} onChange={handleInputChange} fullWidth margin="dense" />
        <TextField name="email" label="Email" value={formData.email} onChange={handleInputChange} fullWidth margin="dense" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} disabled={!formData.id || !formData.firstName || !formData.lastName || !formData.age || !formData.email}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};



const MyTable = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'actions', headerName: 'Actions', width: 400, renderCell: (params) => {
      return (
        <Button
          onClick={(e) => onDeleteClick( params.row.id)}
          variant="contained"
        >
          Delete
        </Button>
      );
    } }
  ];

  
  
  const initialRows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, email: 'jon.snow@gmail.com' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, email: 'cersei.lannister@gmail.com' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, email: 'jaime.lannister@gmail.com' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, email: 'arya.stark@gmail.com' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 25, email: 'daenerys.targaryen@gmail.com' },
  ];
  const [rows, setRows] = useState(initialRows);
  const [addDialogOpen, setAddDialogOpen] = useState(false);


  const onDeleteClick=(id)=>{
    console.log(id);
     const newrow = rows.filter( row => row.id !== id)
     console.log(newrow)
     setRows(newrow)
  }
  const handleAddRow = (formData) => {
    const newRow = {
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age,
      email: formData.email,
    };
    setRows([...rows, newRow]);
  };




  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };
  return (
    
    <div className='container mt-5'>
      <div className='row'>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            components={{
              Toolbar: GridToolbar,
            }}
          
          />
          <Button value="Add" onClick={handleAddDialogOpen} className='button-9'>Add</Button>
          <AddRowDialog open={addDialogOpen} onClose={handleAddDialogClose} onAdd={handleAddRow} />
      </div>
      {/* <button onClick={handleAddDialogOpen()}>Add</button> */}
     
    </div>
  );
};

// const CustomToolbar = (props) => {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarExport />
//       <GridToolbarQuickFilter {...props}/>
//       <Button variant="contained" onClick={props.addButtonProps.onClick}>
//         Add
//       </Button>
     
//     </GridToolbarContainer>
    
//   );
// };

export default MyTable;