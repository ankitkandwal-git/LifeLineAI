import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartPulse, UserCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <motion.footer
      className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 lg:py-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pb-12 border-b border-slate-800">
          <StepCard
            step="1"
            title="Describe Emergency"
            description="Write what happened."
          />
          <StepCard
            step="2"
            title="Receive AI Assessment"
            description="Get a quick severity check."
          />
          <StepCard
            step="3"
            title="Find Nearby Care"
            description="See nearby hospitals."
          />
        </div>

        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-12">
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                <HeartPulse className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                LifeLine<span className="text-blue-500">AI</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-450">
              Emergency help for quick checks, first aid notes, and hospital lookup.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-3 md:pl-10">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">What it does</h4>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <span className="flex items-center gap-2"><ShieldCheck className="text-blue-500" size={14} /> Quick triage summary</span>
              <span className="flex items-center gap-2"><UserCheck className="text-blue-500" size={14} /> Simple flow</span>
              <span className="flex items-center gap-2"><HeartPulse className="text-blue-500" size={14} /> Nearby hospitals</span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Need help?</h4>
            <p className="text-xs text-slate-455">
              Open the chat and start typing.
            </p>
            <Link
              to="/chat"
              className="inline-flex items-center gap-1.5 self-start text-xs font-bold text-blue-500 hover:text-blue-400 group transition"
            >
              Chat now
              <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LifeLineAI. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

const StepCard = ({ step, title, description }) => {
  return (
    <motion.div
      className="flex gap-4 p-6 bg-slate-850/30 border border-slate-800/60 rounded-2xl"
      whileHover={{ y: -2, border: "1px solid rgba(59, 130, 246, 0.2)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-500 font-bold text-sm flex-shrink-0">
        {step}
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-xs leading-relaxed text-slate-450">{description}</p>
      </div>
    </motion.div>
  );
};

export default Footer;