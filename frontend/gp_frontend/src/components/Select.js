import React from 'react'

const Select = ({options, value, setValue, label}) => {
const handleChange = (event) => {
   setValue(event.target.value)
 }

return (
  <form >
    <label> {label} 
    <select value = {value} onChange = {handleChange}>
      {options.map((o) => 
        <option value = {o} key = {o}>{o}</option>
      )}
    </select>
    </label>
  </form>
)
}

export default Select


