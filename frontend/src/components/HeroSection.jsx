import React from 'react'
import AIHealthCare from '../assets/AIHealthCare.jpg'
const HeroSection = () =>{
    return(
        <section className="py-16 bg-gray-100 md:py-20">
            <div className="container flex flex-col items-center px-4 mx-auto md:flex-row md:justify-between md:gap-16">
                <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
                    <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-5xl md:leading-tight">AI Responds When Every Second Counts</h2>
                    <p className="mb-8 text-base text-gray-600 md:text-lg">LifeLineAI is an AI-powered platform that provides instant responses to critical situations, helping you make informed decisions when time is of the essence.</p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <button className="px-6 py-3 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700" type="button">Start Emergency Response</button>
                        <button type="button" className="px-6 py-3 text-blue-600 transition-colors duration-200 bg-white border border-blue-600 rounded-lg hover:bg-gray-50">Learn More</button>
                    </div>
                </div>
                <div className="w-full mt-10 md:mt-0 md:w-1/2">
                    <img src={AIHealthCare} alt="AI Health Care" className="object-cover w-full h-auto rounded-lg shadow-lg" />
                </div>
            </div>
        </section>
    )
}

export default HeroSection