import React from 'react'
import { timeZonesData } from './data'

const TimeZone = ({getValue,setValue})=> {
  return (
    <>
      <select name="timezones" id="timezones" value={getValue}  onChange={(e)=>setValue(e.target.value)}>
      {timeZonesData.map((zone, index) => (
        <option key={index} value={zone}>
          {zone}
        </option>
      ))}
    </select>
    </>
  )
}

export default TimeZone