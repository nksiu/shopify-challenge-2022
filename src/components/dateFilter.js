import React, { useCallback, useState, Fragment } from 'react';
import { DatePicker } from '@shopify/polaris';

const DateFilter = ({ isMulti, dates, updateCurrDate }) => {
  const [{ month, year }, setDate] = useState({ month: dates.start.getMonth(), year: dates.start.getFullYear() });
  const [selectedDates, setSelectedDates] = useState({
    start: dates.start,
    end: dates.end
  });

  const changeDates = (e) => {
    setSelectedDates(e)
    updateCurrDate(e)
  }

  const handleMonthChange = useCallback((month, year) => setDate({ month, year }), []);

  return (
    <Fragment>
      <DatePicker
        month={month}
        year={year}
        onChange={changeDates}
        onMonthChange={handleMonthChange}
        selected={selectedDates}
        allowRange={isMulti}
        disableDatesAfter={new Date()}
      />
    </Fragment>
  )
}

export default DateFilter
