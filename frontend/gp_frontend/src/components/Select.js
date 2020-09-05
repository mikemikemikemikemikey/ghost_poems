import React from 'react'
import {SelectStyle, Option} from './Style'



const Select = ({options, value, setValue, label}) => {
const handleChange = (event) => {
   setValue(event.target.value)
 }

return (
  <form >
    <label> {label} 
    <SelectStyle value = {value} onChange = {handleChange}>
      {options.map((o) => 
        <Option value = {o} key = {o}>{o}</Option>
      )}
    </SelectStyle>
    </label>
  </form>
)

export default Select


