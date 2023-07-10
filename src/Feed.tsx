import { Button, Carousel } from 'react-bootstrap';
import hamburger1 from './assets/giorgi-iremadze-5ZR4DxAG3RQ-unsplash.jpg'
import hamburger2 from './assets/jon-parry-4A9IELfRdwE-unsplash.jpg'
import hamburger3 from './assets/ric-matkowski-T8SD7bwyxHU-unsplash.jpg'
import { AiOutlineLike,AiTwotoneLike ,AiOutlineShareAlt} from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import {MdSaveAlt} from "react-icons/md";
import './style.css'
// uuid import 해서 포스트에 id 부과하기



type FeedProps = {
  leftNavData: string
}

const Feed = ({leftNavData}: FeedProps) => {

  return (
    <>
      <div className='flex flex-auto justify-center  bg-orange-400'>
        <div className='flex flex-col w-11/12 items-center justify-center p-1 my-4 overflow-y-scroll'>
          <div className="flex flex-row">
            <Carousel className='my-4	bg-red-800 p-2 carousel' interval={null} slide={false}>
              <Carousel.Item>
                <img
                  className="d-block h-2/3"
                  src={hamburger1}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  <p>2Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  <p>3Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block h-2/3"
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
                  className="d-block h-2/3"
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
            <div className=' bg-yellow-400 flex flex-col justify-end pb-5 '>
              <div className='py-2 flex flex-col sm:text-xs '>
                <Button variant='light' >
                  <AiOutlineLike size={30} />
                </Button>
                <h2 className='pl-2'>likes</h2>
              </div>
              <div className='py-2 flex flex-col'>
                <Button variant='light '>
                  <BiCommentDetail size={30}/>
                </Button>
                <h4 className=' text-xs'>comments</h4>
              </div>
              <div className='py-2 flex flex-col'>
                <Button variant='light '>
                  <MdSaveAlt size={30}/>
                </Button>
                <h2 className='pl-2'>saves</h2>
              </div>
              <div className='py-2  flex flex-col'>
                <Button variant='light'>
                  <AiOutlineShareAlt size={30}/>
                </Button>
                <h2 className='pl-2'>share</h2>
              </div>
            </div>
          </div>
          <Carousel className='my-4 bg-red-800 p-4' interval={null}>
            <Carousel.Item>
              <img
                className="d-block w-full"
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
                className="d-block"
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
                className="d-block"
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