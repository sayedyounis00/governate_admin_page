import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { ArrowRight, User, Phone, MapPin, Map, PhoneCall, Calendar, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ErrorBanner from '../components/ErrorBanner';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';

const ACADEMIC_YEARS = {
  '68fc4c07-fee6-46a0-8128-f4c1b8dffafa': 'الصف الاول الثانوي',
  '677fc9f4-7a36-4dbe-8b29-808b1f5f2dab': 'الصف الثاني الثانوي',
  'c77a0cf6-cff9-46bb-8791-8247fa3c219f': 'الصف الثالث الثانوي'
};

const getWhatsAppUrl = (phone) => {
  if (!phone) return '#';
  let cleaned = phone.toString().replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '20' + cleaned.substring(1);
  } else if (!cleaned.startsWith('20')) {
    cleaned = '20' + cleaned;
  }
  return `https://wa.me/${cleaned}`;
};

const DetailRow = ({ label, value, isPhone = false, icon: Icon }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-border/40 last:border-0 group hover:bg-white/5 transition-colors px-3 -mx-3 rounded-xl">
      <div className="w-full sm:w-1/3 font-semibold text-text-muted mb-1.5 sm:mb-0 flex items-center gap-2">
        {Icon && <Icon size={16} className="text-primary/60" />}
        {label}
      </div>
      <div className="w-full sm:w-2/3 text-text-main font-bold">
        {value === null || value === undefined || value === '' ? (
          <span className="text-text-muted/60 italic font-medium">غير متاح</span>
        ) : isPhone ? (
          <a href={getWhatsAppUrl(value)} target="_blank" rel="noopener noreferrer" dir="ltr" className="text-primary hover:text-green-500 transition-colors hover:underline inline-flex items-center gap-2">
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

const fetchStudent = async (id) => {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      phone,
      student_id,
      current_year_id,
      created_at,
      governorate_name,
      center_name,
      parent_phone_number
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
};

export default function StudentDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const returnPath = searchParams.get('returnPath') || '';
  
  const { data: student, error, isLoading: loading } = useSWR(id ? ['student', id] : null, ([_, id]) => fetchStudent(id), {
    revalidateOnFocus: false,
    dedupingInterval: 60000
  });

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="h-10 w-32 bg-border/50 animate-pulse rounded-xl mb-6"></div>
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <ErrorBanner message={error.message || 'حدث خطأ'} />
        <Link to={`/?${returnPath}`} className="text-primary hover:underline font-bold mt-4 inline-flex items-center gap-2">
          <ArrowRight size={16} /> العودة إلى القائمة
        </Link>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        <EmptyState message="الطالب غير موجود" />
        <div className="text-center mt-6">
          <Link to={`/?${returnPath}`} className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20">
            <ArrowRight size={18} /> العودة إلى القائمة
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(student.created_at).toLocaleDateString('ar-EG', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-6 md:mb-8">
        <Link to={`/?${returnPath}`} className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-bold bg-surface/50 backdrop-blur-sm border border-border/50 px-4 py-2.5 rounded-xl shadow-sm">
          <ArrowRight size={18} /> العودة إلى القائمة
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-surface border border-border/80 rounded-3xl shadow-xl shadow-black/40 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-primary/10 rounded-bl-[100px] -z-10" />
        
        <div className="p-6 md:p-10 border-b border-border/40 relative">
          <div className="inline-block bg-primary-light/70 text-primary font-mono font-bold px-4 py-1.5 rounded-xl mb-4 md:mb-6 text-xs md:text-sm tracking-widest border border-primary/20">
            STD ID / {student.student_id}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-text-main leading-tight tracking-tight mb-3">
            {student.full_name}
          </h2>
          <p className="text-text-muted font-medium flex items-center gap-2 text-sm md:text-base">
            <MapPin size={16} /> مسجل في منصة البيولوجيا
          </p>
        </div>

        <div className="p-6 md:p-10 bg-surface">
          <DetailRow icon={User} label="الاسم الكامل" value={student.full_name} />
          <DetailRow icon={Phone} label="رقم الهاتف" value={student.phone} isPhone />
          <DetailRow icon={Map} label="المحافظة" value={student.governorate_name} />
          <DetailRow icon={MapPin} label="المركز" value={student.center_name} />
          <DetailRow icon={PhoneCall} label="هاتف ولي الأمر" value={student.parent_phone_number} isPhone />
          <DetailRow icon={Calendar} label="تاريخ التسجيل" value={formattedDate} />
          <DetailRow icon={BookOpen} label="السنة الدراسية" value={ACADEMIC_YEARS[student.current_year_id] || student.current_year_id} />
        </div>
      </motion.div>
    </div>
  );
}
