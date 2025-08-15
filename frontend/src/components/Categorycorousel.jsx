import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setsearchquery } from '@/redux/jobSlice'

const Categorycorousel = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

      const searchJobHandler = (cat)=>
      {
        dispatch(setsearchquery(cat))
        navigate("/browse")
       
        
    
      }
    const category = [
        "Frontend Devloper",
        "Backend Devloper",
        "Data Science",
        "Graphic Designer",
        "FullStack Devloper"
    ]
    return (
        <div>
            <Carousel className='w-full max-w-xl mx-auto my-10 '>
                <CarouselContent>

                    {
                        category.map((cat, index) => (
                            <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
                                <Button onClick={()=>searchJobHandler(cat)} variant='outline' className='rounded-full'>{cat}</Button>

                            </CarouselItem>
                        ))}





                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default Categorycorousel