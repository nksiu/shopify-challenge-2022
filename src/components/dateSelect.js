import React, { useCallback, useState } from 'react'
import { Select } from '@shopify/polaris'
import styled from 'styled-components'

const SelectSC = styled.div`
  width: 150px;
`

const DateSelect = ({ setIsMulti }) => {
  const [selected, setSelected] = useState('single_date');

  const handleSelectChange = useCallback((value) => {
    setSelected(value)
    setIsMulti(value === 'multiple_dates')
  }, [setIsMulti])

  const options = [
    {label: 'Single Date', value: 'single_date'},
    {label: 'Mutliple Dates', value: 'multiple_dates'},
  ]

  return (
    <SelectSC>
      <Select
        label="Date Selection Type"
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />
    </SelectSC>
  )
}

export default DateSelect
