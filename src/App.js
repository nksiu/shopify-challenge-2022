import { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Heading, DisplayText, Spinner } from '@shopify/polaris'
import Cards from './components/cards'
import DateModal from './components/dateModal'
import DateSelect from './components/dateSelect'

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 20px;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 650px) {
    flex-direction: column;
    row-gap: 5px;
  }
`

const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  column-gap: 10px;
`

const HideContainer = styled.div`
  display: ${props => props.isLoading ? 'none' : 'block'};
`
const SpinnerSC = styled.div`
  width: 62px;
  padding-top: 50px;
  margin: 0 auto;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => !props.hasMulti || props.isLoading ? '40vw' : '40vw 40vw'};
  justify-content: center;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 100px;
  gap: 20px 20px;

  @media (max-width: 800px) {
    grid-template-columns: 60vw;
  }
`

const App = () => {
  const [isMulti, setIsMulti] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dates, setDates] = useState({
    start: new Date(),
    end: new Date()
  })

  const getDateText = (start, end) => {
    const today = new Date()
    const todayDate = today.toISOString().split('T')[0]
    const startDate = start.toISOString().split('T')[0]
    const endDate = end.toISOString().split('T')[0]

    if (startDate === endDate && endDate === todayDate) {
      return {isMulti: false, msg: 'Today'}
    }
    else if (startDate === endDate) {
      return {hasMulti: false, msg: startDate}
    }
    else {
      return {hasMulti: true, msg: startDate + ' to ' + endDate}
    }
  }

  const handleDateType = (val) => {
    setIsMulti(val == 'multiple_dates')
  }
  const handleDateChange = (val) => {
    setDates(val)
  }

  const {hasMulti, msg} = getDateText(dates.start, dates.end)

  return (
    <Fragment>
      <TitleContainer>
        <DisplayText size='large' element='h1'>Spacestagram</DisplayText>
      </TitleContainer>
      <InfoContainer>
        <Heading element='h2'>
          Showing: {msg}
        </Heading>
        <DateContainer>
          <DateSelect handleDateType={handleDateType}/>
          <DateModal isMulti={isMulti} dates={dates} handleDateChange={handleDateChange} />
        </DateContainer>
      </InfoContainer>

      <HideContainer isLoading={!isLoading}>
        <SpinnerSC>
          <Spinner accessibilityLabel='Loading Spinner' size='large' />
        </SpinnerSC>
      </HideContainer>
      <HideContainer isLoading={isLoading}>
        <Grid hasMulti={hasMulti} isLoading={isLoading}>
          <Cards dates={dates} setIsLoading={setIsLoading} />
        </Grid>
      </HideContainer>
    </Fragment>
  )
}

export default App;
