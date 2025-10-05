import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, BookmarkCheck, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { URL_ENDPOINT } from '../utils/Constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'



const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${URL_ENDPOINT}/logout`)
            if (res.data.success) {
                dispatch(setUser(null))
                toast.success(res.data.message)
                setIsMobileMenuOpen(false)
            }
        } catch (error) {
            toast.error("Logout failed")
        }
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <div className='bg-white shadow-sm'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className='flex justify-between items-center h-16'>
                    {/* Logo */}
                    <div className='flex-shrink-0'>
                        <Link to="/" className='text-2xl font-bold'>
                            Job<span className='text-[#F83002]'>Portal</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-8'>
                        <nav className='flex space-x-6'>
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <Link to="/admin/companies" className='text-gray-700 hover:text-[#6A38c2] transition-colors'>
                                        Companies
                                    </Link>
                                    <Link to="/admin/jobs" className='text-gray-700 hover:text-[#6A38c2] transition-colors'>
                                        Jobs
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/" className='text-gray-700 hover:text-[#6A38c2] transition-colors'>
                                        Home
                                    </Link>
                                    <Link to="/jobs" className='text-gray-700 hover:text-[#6A38c2] transition-colors'>
                                        Jobs
                                    </Link>
                                    <Link to="/browse" className='text-gray-700 hover:text-[#6A38c2] transition-colors'>
                                        Browse
                                    </Link>
                                </>
                            )}
                        </nav>

                        {!user ? (
                            <div className='flex items-center space-x-3'>
                                <Link to="/login">
                                    <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38c2] hover:bg-[#5a2ea8]">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer hover:ring-2 hover:ring-[#6A38c2] transition-all'>
                                        <AvatarImage src={user.profilephoto} alt={user.name} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80' align="end">
                                    <div className='flex items-center gap-3 mb-4'>
                                        <Avatar>
                                            <AvatarImage src={user.profilephoto} alt={user.name} />
                                        </Avatar>
                                        <div className='flex-1'>
                                            <h4 className='font-medium text-gray-900'>{user.name}</h4>
                                            <p className='text-sm text-gray-500 truncate'>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className='space-y-2'>
                                        {user.role === 'student' && (
                                            <Button variant='ghost' className='w-full justify-start' asChild>
                                                <Link to="/profile">
                                                    <User2 className='w-4 h-4 mr-2' />
                                                    View Profile
                                                </Link>
                                            </Button>
                                        )}
                                        <Button
                                            variant='ghost'
                                            className='w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50'
                                            onClick={logoutHandler}
                                        >
                                            <LogOut className='w-4 h-4 mr-2' />
                                            Logout
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='md:hidden'>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleMobileMenu}
                            className='p-2'
                        >
                            {isMobileMenuOpen ? (
                                <X className='h-6 w-6' />
                            ) : (
                                <Menu className='h-6 w-6' />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className='md:hidden border-t border-gray-200 bg-white'>
                        <div className='px-2 pt-2 pb-3 space-y-1'>
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <Link
                                        to="/admin/companies"
                                        className='block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#6A38c2] rounded-md transition-colors'
                                        onClick={closeMobileMenu}
                                    >
                                        Companies
                                    </Link>
                                    <Link
                                        to="/admin/jobs"
                                        className='block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#6A38c2] rounded-md transition-colors'
                                        onClick={closeMobileMenu}
                                    >
                                        Jobs
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/"
                                        className='block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#6A38c2] rounded-md transition-colors'
                                        onClick={closeMobileMenu}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="/jobs"
                                        className='block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#6A38c2] rounded-md transition-colors'
                                        onClick={closeMobileMenu}
                                    >
                                        Jobs
                                    </Link>
                                    <Link
                                        to="/browse"
                                        className='block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#6A38c2] rounded-md transition-colors'
                                        onClick={closeMobileMenu}
                                    >
                                        Browse
                                    </Link>
                                </>
                            )}

                            {!user ? (
                                <div className='pt-4 pb-2 border-t border-gray-200'>
                                    <div className='flex flex-col space-y-2 px-3'>
                                        <Link to="/login" onClick={closeMobileMenu}>
                                            <Button variant="outline" className="w-full">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link to="/signup" onClick={closeMobileMenu}>
                                            <Button className="w-full bg-[#6A38c2] hover:bg-[#5a2ea8]">
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className='pt-4 pb-2 border-t border-gray-200'>
                                    <div className='px-3 py-2'>
                                        <div className='flex items-center gap-3 mb-3'>
                                            <Avatar className='h-10 w-10'>
                                                <AvatarImage src={user.profilephoto} alt={user.name} />
                                            </Avatar>
                                            <div>
                                                <p className='font-medium text-gray-900'>{user.name}</p>
                                                <p className='text-sm text-gray-500'>{user.email}</p>
                                            </div>
                                        </div>
                                        {user.role === 'student' && (
                                            <Button variant='ghost' className='w-full justify-start mb-2' asChild>
                                                <Link to="/profile" onClick={closeMobileMenu}>
                                                    <User2 className='w-4 h-4 mr-2' />
                                                    View Profile
                                                </Link>
                                            </Button>
                                        )}
                                        <Button
                                            variant='ghost'
                                            className='w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50'
                                            onClick={logoutHandler}
                                        >
                                            <LogOut className='w-4 h-4 mr-2' />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
