import { Fragment, useEffect, useState } from 'react'
import AxiosInstance from '../AxiosInstance'
import ImageCard from './imageCard'

const Cards = ({ dates, setIsLoading }) => {
  const [data, setData] = useState([])

  const getDate = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return year + '-' + month + '-' + day
  }

  const startDate = getDate(dates.start)
  const endDate = getDate(dates.end)

  const getApod = () => {
    AxiosInstance.get(`?api_key=pGl7pcWw9EI3eZcAy9AL0gYlKz5nd63jYZJukjvs&start_date=${startDate}&end_date=${endDate}`).then(res => {
      setData(res.data)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    setIsLoading(true)
    getApod()
  }, [dates])
 

  return (
    <Fragment>
      {
        data.map(apod => (
          <ImageCard key={apod.title} apod={apod}/>
        ))
      }
    </Fragment>
  )
}

export default Cards
