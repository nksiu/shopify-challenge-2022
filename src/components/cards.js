import { DisplayText } from '@shopify/polaris'
import { Fragment, useEffect, useState } from 'react'
// import AxiosInstance from '../AxiosInstance'
import axios from 'axios'
import ImageCard from './imageCard'

const Cards = ({ dates, setIsLoading }) => {
  const [data, setData] = useState([])
  const [hasError, setHasError] = useState(false)

  const getDate = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return year + '-' + month + '-' + day
  }

  const startDate = getDate(dates.start)
  const endDate = getDate(dates.end)

  const getApod = () => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=pGl7pcWw9EI3eZcAy9AL0gYlKz5nd63jYZJukjvs&start_date=${startDate}&end_date=${endDate}`).then(res => {
      setHasError(false)
      setData(res.data)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err)
      setHasError(true)
    })
  }


  useEffect(() => {
    setIsLoading(true)
    getApod()
  }, [dates])
 

  return (
    <Fragment>
      {
        hasError ?
          <DisplayText size='medium'>{data.msg}</DisplayText>
        :
          data.map(apod => (
            <ImageCard key={apod.title} apod={apod}/>
          ))
      }
    </Fragment>
  )
}

export default Cards
