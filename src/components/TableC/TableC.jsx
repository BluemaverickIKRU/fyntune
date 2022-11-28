import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';

import { deleteShop } from '../../store/shopListSlice';

export default function TableC({ shopList }) {
  const dispatch = useDispatch();

  const handleEdit = (row) => {};

  const handleDelete = (id) => {
    dispatch(deleteShop(id));
  };

  return shopList.length > 0 ? (
    <TableContainer
      style={{ width: '80vw', margin: ' 2em auto' }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ background: 'skyBlue' }}>
          <TableRow>
            <TableCell align="center">Shop Name</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Area</TableCell>
            <TableCell align="center">Opening Date</TableCell>
            <TableCell align="center">Closing Date</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shopList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.category}</TableCell>
              <TableCell align="center">{row.area}</TableCell>
              <TableCell align="center">{row.openingDate}</TableCell>
              <TableCell align="center">{row.closingDate}</TableCell>
              <TableCell align="center">
                {
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEdit(row)}
                  >
                    <EditIcon fontSize="small" />
                  </div>
                }
              </TableCell>
              <TableCell align="center">
                {
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </div>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <p style={{ marginTop: '4em', textAlign: 'center' }}>Table is empty !</p>
  );
}
