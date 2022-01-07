import { useState, useCallback } from 'react'
import {
  TextContainer,
  Collapsible,
  TextStyle,
  Subheading
} from '@shopify/polaris'
import styled, { keyframes } from 'styled-components'

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
`

const ImageCard = ({apod}) => {
  const [open, setOpen] = useState(false)

  const handleToggle = useCallback(() => setOpen((open) => !open), [])

  return (
    <Card>
      <img 
        alt={`APOD picture on ${apod.date}`}
        src={apod.url}
      />

      <ContentContainer>
          <TextContainer spacing='tight'>
            <Subheading>{apod.title}</Subheading>
            <TextStyle variation='subdued'>{apod.date}</TextStyle>
          </TextContainer>
          {/* <Button
            onClick={handleToggle}
            ariaExpanded={open}
            ariaControls='explanation-collapsible'
            transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
            expandOnPrint
          >
            Show Description
          </Button>
          <Collapsible
            id='explanation-collapsible'
            open={open}

          >
            <TextContainer>
              <p>{apod.explanation}</p>
            </TextContainer>
          </Collapsible> */}
        </ContentContainer>
    </Card>
  )
}

export default ImageCard
