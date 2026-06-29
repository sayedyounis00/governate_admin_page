import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Users } from 'lucide-react';

const StudentCard = React.memo(({ student, returnPath, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        to={`/student/${student.id}${returnPath ? `?returnPath=${encodeURIComponent(returnPath)}` : ''}`}
        className="group h-full flex flex-col relative bg-surface border border-border/80 rounded-2xl p-5 md:p-6 shadow-md shadow-black/20 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 transition-all duration-300 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-24 md:w-32 h-24 md:h-32 bg-primary/10 rounded-br-full -z-10 transition-transform duration-500 group-hover:scale-110" />
        
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <div className="bg-primary-light/70 text-primary text-xs md:text-sm font-mono font-bold px-3 py-1.5 rounded-lg tracking-widest border border-primary/20">
            {student.student_id}
          </div>
          <div className="h-8 w-8 rounded-full bg-background border border-border/50 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
          </div>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-text-main mb-5 md:mb-6 leading-tight group-hover:text-primary transition-colors flex-grow">
          {student.full_name}
        </h3>
        
        <div className="space-y-2.5 md:space-y-3 text-sm md:text-base text-text-muted mt-auto pt-4 border-t border-border/40">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-primary/60 shrink-0" />
            <span className="font-medium truncate">{student.governorate_name || 'غير محدد'} — {student.center_name || 'غير محدد'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-primary/60 shrink-0" />
            <span dir="ltr" className="text-right w-full font-medium">{student.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Users size={18} className="text-primary/60 shrink-0" />
            {student.parent_phone_number ? (
              <span dir="ltr" className="text-right w-full font-medium">{student.parent_phone_number}</span>
            ) : (
              <span className="italic opacity-60">غير متاح</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

export default StudentCard;
