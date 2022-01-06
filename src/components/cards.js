import { Fragment, useEffect, useState } from 'react'
import AxiosInstance from '../AxiosInstance'
import ImageCard from './imageCard'

const Cards = () => {
  const [data, setData] = useState([])

  const getApod = async() => {
    AxiosInstance.get(`?api_key=pGl7pcWw9EI3eZcAy9AL0gYlKz5nd63jYZJukjvs&start_date=2022-01-02&end_date=2022-01-05`).then(res => {
      if (Array.isArray(res.data)) {
        console.log('over', res.data)
        setData(res.data)
      } else{
        setData([res.data])
      }
    })
  }

  useEffect(() => {
    getApod()
  }, [])
 

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
