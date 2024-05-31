import React, { useState } from 'react'
import './../../styles/components/home/viewPerPageSelector.scss'

const ViewPerPageSelector = ({handleValueOnChange}) => {
    const pageViewOptions = [5, 10, 20, 30, 50];
    const [selectedValue, setSelectedValue] = useState(pageViewOptions[0]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        if (handleValueOnChange) {
            handleValueOnChange(newValue);
        }
      };      

  return (
    <div className='view-per-page-selector'>
        <label>Broj po prikazu</label>
        <select value={selectedValue} onChange={handleChange}>
            {
                pageViewOptions.map((itemValue, index) => <option key={index} value={itemValue}>{itemValue}</option>)
            }
        </select>
    </div>
  )
}

export default ViewPerPageSelector
