import { Fragment } from 'react'
import styled from 'styled-components'
import Cards from './components/cards'

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  width: 80%;
  justify-content: center;
  margin: 50px auto;
  padding-top: 100px;
  padding-bottom: 100px;
  gap: 20px 20px;

  @media (max-width: 800px) {
    grid-template-columns: auto;
  }
`

const App = () => {
  return (
    <Fragment>
      <Grid>
        <Cards />
      </Grid>
    </Fragment>
  )
}

export default App;
