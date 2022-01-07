import React, { useCallback, useState } from 'react'
import { Button, Modal, Stack } from '@shopify/polaris'
import DateFilter from './dateFilter'

 const DateModal = ({ isMulti, dates, handleDateChange }) => {
  const [active, setActive] = useState(false)
  const [currDate, setCurrDate] = useState(dates)

  const toggleActive = useCallback(() => setActive((active) => !active), [])
  const updateCurrDate = (val) => {
    setCurrDate(val)
  }
  const onDateSubmit = () => {
    console.log(currDate)
    handleDateChange(currDate)
    toggleActive()
  }

  const activator = <Button primary onClick={toggleActive}>Filter Date(s)</Button>;

  return (
    <Modal
      large
      activator={activator}
      open={active}
      onClose={toggleActive}
      title="Select Date(s)"
      primaryAction={{
        content: 'Submit',
        onAction: onDateSubmit,
      }}
    >
      <Modal.Section>
        <Stack vertical>
          <DateFilter isMulti={isMulti} dates={dates} updateCurrDate={updateCurrDate} />
        </Stack>
      </Modal.Section>
    </Modal>
  )
}

export default DateModal
