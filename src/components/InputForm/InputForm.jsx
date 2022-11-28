import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

import './InputForm.css';
import { addShop } from '../../store/shopListSlice';

const InputForm = () => {
  const dispatch = useDispatch();

  // React state
  const [selectOptions, setSelectOptions] = useState({
    name: '',
    category: '',
    area: '',
    openingDate: '',
    closingDate: '',
  });

  // Yup schema for inputs
  const validateTask = Yup.object().shape({
    shopName: Yup.string().matches(/[A-Za-z]/, 'Please have only alphabets'),
  });

  // Formil for validation
  const validateFormik = useFormik({
    initialValues: {
      shopName: '',
    },
    validationSchema: validateTask,
    onSubmit: (values, { resetForm }) => {
      handleSubmitForm(values);
      resetForm({ values: '' });
      setSelectOptions({
        name: '',
        category: '',
        area: '',
        openingDate: '',
        closingDate: '',
      });
    },
  });

  const randomIdGenerator = () => {
    return Math.floor(Math.random() * 10);
  };

  // Form Validation for shop name
  const handleSubmitForm = (values) => {
    let id = '';
    setSelectOptions((prev) => {
      return { ...prev, name: values.shopName };
    });
    for (let i = 0; i < 5; i++) {
      id += randomIdGenerator();
    }
    dispatch(addShop({ ...selectOptions, name: values.shopName, id }));
  };

  //   Handle change events of input
  const handleChange = (event) => {
    if (event.target.name === 'shopCategory') {
      setSelectOptions((prev) => {
        return { ...prev, category: event.target.value };
      });
    } else if (event.target.name === 'shopArea') {
      setSelectOptions((prev) => {
        return { ...prev, area: event.target.value };
      });
    } else if (event.target.name === 'openingDate') {
      setSelectOptions((prev) => {
        return { ...prev, openingDate: event.target.value };
      });
    } else if (event.target.name === 'closingDate') {
      setSelectOptions((prev) => {
        return { ...prev, closingDate: event.target.value };
      });
    }
  };

  return (
    <div className="form-container">
      <h3 className="form-title">Add your shop</h3>
      <form className="form" onSubmit={validateFormik.handleSubmit}>
        {/* Shop name field */}
        <div className="form-input">
          <TextField
            required
            fullWidth
            id="shopName"
            label="Shop Name"
            variant="outlined"
            name="shopName"
            value={validateFormik.values.shopName}
            onChange={validateFormik.handleChange}
            error={
              validateFormik.touched.shopName &&
              Boolean(validateFormik.errors.shopName)
            }
            helperText={
              validateFormik.touched.shopName && validateFormik.errors.shopName
            }
          />
        </div>
        {/* Shop Category field */}
        <div className="form-input">
          <FormControl fullWidth>
            <InputLabel>Shop Category</InputLabel>
            <Select
              required
              name="shopCategory"
              value={selectOptions.category}
              label="Shop Category"
              onChange={handleChange}
            >
              <MenuItem value="Grocery">Grocery</MenuItem>
              <MenuItem value="Butcher">Butcher</MenuItem>
              <MenuItem value="Baker">Baker</MenuItem>
              <MenuItem value="Chemist">Chemist</MenuItem>
              <MenuItem value="Stationery Shop">Stationery Shop</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* Shop area field */}
        <div className="form-input">
          <FormControl fullWidth>
            <InputLabel>Shop Area</InputLabel>
            <Select
              required
              name="shopArea"
              value={selectOptions.area}
              label="Shop Category"
              onChange={handleChange}
            >
              <MenuItem value="Thane">Thane</MenuItem>
              <MenuItem value="Pune">Pune</MenuItem>
              <MenuItem value="Mumbai Suburban">Mumbai Suburban</MenuItem>
              <MenuItem value="Nashik">Nashik</MenuItem>
              <MenuItem value="Nagpur">Nagpur</MenuItem>
              <MenuItem value="Ahmednagar">Ahmednagar</MenuItem>
              <MenuItem value="Solapur">Solapur</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="form-input-date">
          <label className="date-label-form">Opening Date</label>
          <input
            required
            type="date"
            onChange={handleChange}
            name="openingDate"
            value={selectOptions.openingDate}
          />
        </div>
        <div className="form-input-date">
          <label className="date-label-form">Closing Date</label>
          <input
            required
            type="date"
            min={selectOptions.openingDate}
            onChange={handleChange}
            name="closingDate"
            value={selectOptions.closingDate}
          />
        </div>
        {/* Submit button */}
        <div className="btn-div">
          <Button
            type="submit"
            style={{ background: 'skyBlue', color: 'black', margin: '0 1em' }}
            variant="contained"
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
