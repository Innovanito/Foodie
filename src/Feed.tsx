import { Button, Card, Carousel } from 'react-bootstrap';
import hamburger1 from './assets/giorgi-iremadze-5ZR4DxAG3RQ-unsplash.jpg'
import hamburger2 from './assets/jon-parry-4A9IELfRdwE-unsplash.jpg'
import hamburger3 from './assets/ric-matkowski-T8SD7bwyxHU-unsplash.jpg'

type FeedProps = {
  leftNavData: string
}

const Feed = ({leftNavData}: FeedProps) => {

  return (
    <>
      <div className='flex ml-10 overflow-y-scroll'>
        <div className='flex flex-col w-3/4 items-center p-2 my-4'>
        
          <Carousel slide={false} className='my-4	bg-red-800 p-4'>
            <Carousel.Item>
              <img
                className="d-block w-100 w-full"
                src={hamburger1}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={hamburger2}
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={hamburger3}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <Carousel slide={false} className='my-4 bg-red-800 p-4'>
            <Carousel.Item>
              <img
                className="d-block w-100 w-full"
                src={hamburger1}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={hamburger2}
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={hamburger3}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </>
  )
}

export default Feed