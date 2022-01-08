import { useState, useCallback, useEffect } from 'react'
import {
  TextContainer,
  TextStyle,
  Subheading
} from '@shopify/polaris'
import styled, { keyframes } from 'styled-components'
import Heart from 'react-animated-heart'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Card = styled.div`
  width: 100%;
  overflow: hidden;
  border: 1px solid lightgray;
  border-radius: 8px;
  animation: ${fadeIn} 1s linear;

  img {
    height: 30vw;
    width: 100%;
    object-fit: fill;
    object-position: 50% 50%;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
  padding-bottom: 50px;
  position: relative;
`

const HeartContainer = styled.div`
  position: absolute;
  bottom: -25px;
  right: -20px;
`

const ImageCard = ({apod}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    saveLiked()
    setIsLiked(!isLiked)
  }

  // Using local storage to save liked photos
  const saveLiked = () => {
    const liked = localStorage.getItem('liked')
    if (!liked) {
      localStorage.setItem('liked', JSON.stringify([apod.date]))
      return
    }

    let likedArr = JSON.parse(liked)
    if (!isLiked) {
      if (!likedArr.includes(apod.date)) {
        likedArr.push(apod.date)
      }
    } else {
      likedArr = likedArr.filter(date => date !== apod.date)
    }
    console.log(likedArr)
    localStorage.setItem('liked', JSON.stringify(likedArr))
  }

  const hasBeenLiked = useCallback(() => {
    const liked = localStorage.getItem('liked')

    if (liked) {
      const likedArr = JSON.parse(liked)
      for (const date of likedArr) {
        if (date === apod.date) {
          return true
        }
      }
    }
    return false
  }, [apod.date])


  useEffect(() => {
    setIsLiked(hasBeenLiked())
  }, [hasBeenLiked])

  return (
    <Card>
      <img 
        alt={`APOD on ${apod.date}`}
        src={apod.url}
      />

      <ContentContainer>
          <TextContainer spacing='tight'>
            <Subheading>{apod.title}</Subheading>
            <TextStyle variation='subdued'>{apod.date}</TextStyle>
          </TextContainer>
          <HeartContainer>
            <Heart id={apod.date} isClick={isLiked} onClick={handleLike} />
          </HeartContainer>
        </ContentContainer>
    </Card>
  )
}

export default ImageCard
