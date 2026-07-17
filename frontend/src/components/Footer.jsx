import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            className="py-8 text-white bg-gradient-to-r from-gray-800 to-gray-900 md:py-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container px-4 mx-auto">
                {/* Top Section: Title and Tagline */}
                <div className="flex flex-col items-center justify-between pb-6 border-b border-gray-700 md:flex-row md:pb-8">
                    <h3 className="mb-4 text-2xl font-bold md:mb-0">LifeLineAI</h3>
                    <p className="text-gray-300 text-md">Simple Steps for Immediate Help</p>
                </div>
                {/* Steps Section */}
                <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
                    <motion.div
                        className="flex flex-col items-center p-8 text-center bg-gray-700 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)' }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-center w-16 h-16 mb-4 text-2xl font-bold bg-blue-600 rounded-full">1</div>
                        <h3 className="mb-2 text-2xl font-semibold">Describe Emergency</h3>
                        <p className="text-base text-gray-300">Provide a brief description of the emergency situation.</p>
                    </motion.div>
                    <motion.div 
                        className="flex flex-col items-center p-8 text-center bg-gray-700 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)' }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-center w-16 h-16 mb-4 text-2xl font-bold bg-blue-600 rounded-full">2</div>
                        <h3 className="mb-2 text-2xl font-semibold">Receive AI Response</h3>
                        <p className="text-base text-gray-300">Get an instant response from our AI system with guidance and instructions.</p>
                    </motion.div>
                    <motion.div 
                        className="flex flex-col items-center p-8 text-center bg-gray-700 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)' }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-center w-16 h-16 mb-4 text-2xl font-bold bg-blue-600 rounded-full">3</div>
                        <h3 className="mb-2 text-2xl font-semibold">Take Action</h3>
                        <p className="text-base text-gray-300">Follow the AI's advice and take appropriate action to address the emergency.</p>
                    </motion.div>
                </div>
                {/* Feature Section */}
                <div className="mt-10 text-center md:mt-12">
                    <h3 className="mb-4 text-xl font-semibold">Features</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 text-lg">
                        <motion.div
                            className="flex flex-col items-center justify-center p-8 bg-gray-700 rounded-lg shadow-md"
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)' }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-lg text-gray-300">Real-time AI Assistance</p>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center justify-center p-8 bg-gray-700 rounded-lg shadow-md"
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)' }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-lg text-gray-300">User-friendly Interface</p>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center justify-center p-8 bg-gray-700 rounded-lg shadow-md"
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)' }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-lg text-gray-300">Secure and Private</p>
                        </motion.div>
                    </div>
                </div>
                {/* Copyright Section */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} LifeLineAI. All rights reserved.
                    </p>
                </div>
            </div> 
        </motion.footer>
    );
};


export default Footer