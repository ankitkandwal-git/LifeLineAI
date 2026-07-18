import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, MapPin, PhoneCall, ArrowRight, Star } from 'lucide-react';
import AIHealthCare from '../assets/AIHealthCare.jpg';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-900/10"></div>
        <div className="absolute -left-20 top-60 h-[400px] w-[400px] rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-900/10"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            <motion.div
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/60 bg-blue-50/50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-800/40 dark:bg-blue-950/50 dark:text-blue-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Star className="h-3 w-3 fill-current" />
              Quick help for urgent situations
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Help for <br />
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">emergencies and sudden symptoms</span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Describe what happened, get first-aid guidance, and see nearby hospitals.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                to="/chat"
                className="group flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
              >
                Open Chat
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/how-it-works"
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-850"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="relative lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-600 to-teal-500 opacity-20 blur-xl"></div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white p-2 shadow-2xl dark:border-slate-800/50 dark:bg-slate-900">
              <img
                src={AIHealthCare}
                alt="AI Healthcare Assistance"
                className="h-[350px] w-full rounded-2xl object-cover lg:h-[450px]"
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-24 border-t border-slate-200/60 pt-16 dark:border-slate-800/40">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={Activity}
              title="Symptom check"
              description="A quick read on the situation."
              colorClass="text-blue-600 bg-blue-500/10"
              delay={0.1}
            />
            <FeatureCard
              icon={ShieldAlert}
              title="Emergency Detection"
              description="Marks the case as low, medium, high, or critical."
              colorClass="text-red-600 bg-red-500/10"
              delay={0.2}
            />
            <FeatureCard
              icon={MapPin}
              title="Nearby Hospitals"
              description="Shows nearby hospitals and their addresses."
              colorClass="text-emerald-600 bg-emerald-500/10"
              delay={0.3}
            />
            <FeatureCard
              icon={PhoneCall}
              title="Ambulance Support"
              description="Shows the next steps when time matters."
              colorClass="text-amber-600 bg-amber-500/10"
              delay={0.4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, colorClass, delay }) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/50 p-6 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-850 dark:bg-slate-900/50 dark:hover:border-slate-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClass}`}>
        <Icon size={24} />
      </div>
      <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
    </motion.div>
  );
};

export default HeroSection;