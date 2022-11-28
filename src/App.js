import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';

import InputForm from './components/InputForm/InputForm';
import TableC from './components/TableC/TableC';

const App = () => {
  // Redux state
  const shopList = useSelector((state) => state.shopList.shops);

  // React state
  const [selectOptions, setSelectOptions] = useState({
    type: 'None',
    field: 'None',
  });

  const optionsArray =
    selectOptions.type === 'category'
      ? ['Grocery', 'Butcher', 'Baker', 'Chemist', 'Stationery Shop']
      : selectOptions.type === 'area'
      ? [
          'Thane',
          'Pune',
          'Mumbai Suburban',
          'Nashik',
          'Nagpur',
          'Ahmednagar',
          'Solapur',
        ]
      : selectOptions.type === 'open_close'
      ? ['Open', 'Close']
      : [];

  const filteredList =
    selectOptions.type !== 'None' && selectOptions.field !== 'None'
      ? // eslint-disable-next-line
        shopList.filter((i) => {
          if (
            selectOptions.type === 'open_close' &&
            selectOptions.field === 'Open'
          ) {
            if (
              i.openingDate <= new Date().toISOString().slice(0, 10) &&
              i.closingDate >= new Date().toISOString().slice(0, 10)
            ) {
              return i;
            }
          } else if (
            selectOptions.type === 'open_close' &&
            selectOptions.field === 'Close'
          ) {
            if (
              i.openingDate > new Date().toISOString().slice(0, 10) ||
              i.closingDate < new Date().toISOString().slice(0, 10)
            ) {
              return i;
            }
          } else if (
            i.category === selectOptions.field ||
            i.area === selectOptions.field
          ) {
            return i;
          }
        })
      : shopList;

  const handleChange = (event) => {
    if (event.target.name === 'type') {
      setSelectOptions((prev) => {
        return { type: event.target.value, field: 'None' };
      });
    } else {
      setSelectOptions((prev) => {
        return { ...prev, field: event.target.value };
      });
    }
  };

  return (
    <div>
      <h1 className="home_title">Shop List</h1>
      {/* Form for adding shops */}
      <InputForm />

      {/* Filter Options */}
      <div className="filter-container">
        <div className="filter-title">
          <p>Filter Options</p>
          <FilterListIcon />
        </div>
        <div className="filter-options">
          <div>
            <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
              <InputLabel id="demo-select-small">Choose Type</InputLabel>
              <Select
                name="type"
                labelId="demo-select-small"
                id="demo-select-small"
                value={selectOptions.type}
                label="Choose Type"
                onChange={handleChange}
              >
                <MenuItem value="None">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="category">Category</MenuItem>
                <MenuItem value="area">Area</MenuItem>
                <MenuItem value="open_close">Open / Close</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
              <InputLabel id="demo-select-small">Choose Field</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={selectOptions.field}
                label="Choose Field"
                onChange={handleChange}
                name="field"
              >
                <MenuItem value="None">
                  <em>None</em>
                </MenuItem>
                {optionsArray.map((i) => {
                  return (
                    <MenuItem key={i} value={i}>
                      {i}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      {/* Table to display the added shops */}
      <TableC shopList={filteredList} />
    </div>
  );
};

export default App;
