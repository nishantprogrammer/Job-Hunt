import React from 'react'
import { Popover } from '../ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, BookmarkCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Login from '../Auth/Login'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import axios from 'axios'
import { URL_ENDPOINT } from '../utils/Constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'



const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${URL_ENDPOINT}/logout`)
            if (res.data.success) {
                dispatch(setUser(null))
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error)

        }

    }
    return (
        <>
            <div className='bg-white'>
                <div className='flex justify-between max-w-7xl mx-auto items-center h-16  px-4'>
                    <div className=''><h1 className='font-bold text-2xl'>Job<span className='text-[#F83002]'>Portal</span></h1></div>

                    <div className='flex gap-12  items-center'>
                        <ul className='flex gap-5 text-center'>
                            {
                                 user && user.role == 'recruiter' ? (
                                    <>
                                        <li><Link to="/admin/companies">Companies</Link></li>
                                        <li><Link to="/admin/jobs">Jobs</Link></li>
                                    </>
                                ) :
                                    (
                                        <>
                                            <li><Link to="/">Home</Link></li>
                                            <li><Link to="/jobs">Jobs</Link></li>
                                            <li><Link to="/browse">Browse</Link></li>
                                                                                         <li><Link to="/saved-jobs" className="flex items-center gap-1 text-sm sm:text-base"><BookmarkCheck size={16} className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Saved</span></Link></li>
                                        </>
                                    )
                            }


                        </ul>
                        {
                            !user ? (
                                <div className='flex items-center gap-2'>

                                    <Link to="/login"> <Button variant="outine">login  </Button></Link>
                                    <Link to="signup">
                                        <Button className="bg-[#6A38c2] hover:bg-[#421d81]">SignUp</Button>

                                    </Link>
                                </div>

                            ) : (
                                <div>

                                    <Popover className=''>
                                        <PopoverTrigger asChild>
                                            <Avatar className='cursor-pointer'>
                                                <AvatarImage src={user.profilephoto} alt="@shadcn" />

                                            </Avatar>

                                        </PopoverTrigger>
                                        <PopoverContent className='w-80'>
                                            <div className='flex gap-2'>

                                                <Avatar className='cursor-pointer'>
                                                    <AvatarImage src={user.profilephoto} alt="@shadcn" />


                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium'>{user.name}</h4>
                                                    <p className='text-sm text-muted-foreground'>{user.profile.bio}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2'>
                                                {
                                                    user&& user.role == 'student'&&(
                                                        <div className='flex items-center w-fit'>
                                                    <User2 /> <Button variant='link'><Link to="/profile">View Profile</Link></Button>
                                                </div>
                                                        
                                                    ) 
                                                }

                                                
                                                <div className='flex items-center w-fit'>
                                                    <LogOut /><Button variant='link' onClick={logoutHandler}>Logout</Button>

                                                </div>
                                            </div>



                                        </PopoverContent>
                                    </Popover>
                                </div>
                            )
                        }


                    </div>


                </div>


            </div>
        </>
    )
}

export default Navbar