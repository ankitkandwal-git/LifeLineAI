import react from 'react'
import {Link} from 'react-router-dom'
import LifeLineNavbar from '../assets/LifeLineNavbar.jpg'
import { motion } from 'framer-motion'

const Navbar = () =>{
    return(
        <motion.nav
            className="bg-white shadow-md"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
                <div className="container flex items-center justify-between px-4 py-4 mx-auto sm:px-6 lg:px-8"> {/* Centered content with responsive padding */}
                    <div className="flex items-center flex-shrink-0 space-x-2">
                        {/* Placeholder for logo, ensure you add your logo path here */}
                        <img src={LifeLineNavbar} alt="LifeLineAI Logo" className="w-auto h-8"/> 
                        <h1 className="text-2xl font-extrabold text-gray-800 tracking-wide">LifeLineAI</h1>
                    </div>
                    <div className="hidden gap-6 md:flex"> {/* Hide on small screens, show on medium and up */}
                        <NavLinkMotion to="/chat">AI ChatBot</NavLinkMotion>
                        <NavLinkMotion to="/pricing">Pricing</NavLinkMotion>
                        <NavLinkMotion to="/contact">Contact</NavLinkMotion>
                        <NavLinkMotion to="/how-it-works">How it Works?</NavLinkMotion>
                    </div>
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <motion.button
                            type="button"
                            className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Heroicon "menu" */}
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>
    )
}

const NavLinkMotion = ({ to, children }) => (
    <motion.div
        whileHover={{ scale: 1.05, color: 'rgb(59 130 246)' }} // Equivalent to text-blue-500
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
    >
        <Link to={to} className="text-base font-medium text-gray-800 hover:text-blue-500 transition-colors duration-200">
            {children}
        </Link>
    </motion.div>
);

export default Navbar