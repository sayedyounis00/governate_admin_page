import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import { UsersRound, SearchX } from 'lucide-react';
import { supabase } from '../lib/supabase';
import StudentCard from '../components/StudentCard';
import FilterBar from '../components/FilterBar';
import SkeletonCard from '../components/SkeletonCard';
import ErrorBanner from '../components/ErrorBanner';
import egyptData from '../../egypt_full.json';

const ACADEMIC_YEARS_LIST = [
  { id: '68fc4c07-fee6-46a0-8128-f4c1b8dffafa', name: 'الصف الاول الثانوي' },
  { id: '677fc9f4-7a36-4dbe-8b29-808b1f5f2dab', name: 'الصف الثاني الثانوي' },
  { id: 'c77a0cf6-cff9-46bb-8791-8247fa3c219f', name: 'الصف الثالث الثانوي' }
];

const fetchStudents = async () => {
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
    .order('student_id', { ascending: true });
  if (error) throw error;
  return data || [];
};

export default function StudentListPage() {
  const { data: students = [], error, isLoading: loading } = useSWR('students', fetchStudents, {
    revalidateOnFocus: false,
    dedupingInterval: 60000 // Cache data for 1 minute
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const appliedYear = searchParams.get('year') || '';
  const appliedGovernorate = searchParams.get('gov') || '';
  const appliedCenter = searchParams.get('center') || '';

  const [localYear, setLocalYear] = useState(appliedYear);
  const [localGov, setLocalGov] = useState(appliedGovernorate);
  const [localCenter, setLocalCenter] = useState(appliedCenter);

  useEffect(() => {
    setLocalYear(appliedYear);
    setLocalGov(appliedGovernorate);
    setLocalCenter(appliedCenter);
  }, [appliedYear, appliedGovernorate, appliedCenter]);

  const governorates = useMemo(() => {
    return egyptData.governorates.map(g => g.name_ar).sort();
  }, []);

  const centers = useMemo(() => {
    if (!localGov) return [];
    const gov = egyptData.governorates.find(g => g.name_ar === localGov);
    return gov ? gov.centers.map(c => c.name_ar).sort() : [];
  }, [localGov]);

  const handleYearChange = (year) => {
    setLocalYear(year);
    setLocalGov('');
    setLocalCenter('');
  };

  const handleGovernorateChange = (gov) => {
    setLocalGov(gov);
    setLocalCenter('');
  };

  const handleCenterChange = (center) => {
    setLocalCenter(center);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (localYear) params.set('year', localYear);
    else params.delete('year');
    
    if (localGov) params.set('gov', localGov);
    else params.delete('gov');
    
    if (localCenter) params.set('center', localCenter);
    else params.delete('center');
    
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams(new URLSearchParams());

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchYear = appliedYear ? student.current_year_id === appliedYear : true;
      const matchGov = appliedGovernorate ? student.governorate_name === appliedGovernorate : true;
      const matchCenter = appliedCenter ? student.center_name === appliedCenter : true;
      return matchYear && matchGov && matchCenter;
    });
  }, [students, appliedYear, appliedGovernorate, appliedCenter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative"
      >
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold font-sans text-primary mb-2 tracking-tight">دليل الطلاب</h1>
          <p className="text-text-muted text-base md:text-lg font-medium">منصة البيولوجيا • إدارة بيانات المتعلمين</p>
        </div>
        <div className="bg-surface border border-border/80 shadow-md shadow-black/20 px-5 py-3 rounded-2xl flex items-center gap-3 relative z-10">
          <div className="bg-primary-light text-primary p-2 rounded-lg">
            <UsersRound size={20} />
          </div>
          <div>
            <div className="text-xs text-text-muted font-bold uppercase tracking-wider">إجمالي الطلاب</div>
            <div className="text-xl font-bold text-text-main leading-none mt-1">{loading ? '...' : students.length}</div>
          </div>
        </div>
      </motion.header>

      <FilterBar
        years={ACADEMIC_YEARS_LIST}
        governorates={governorates}
        centers={centers}
        selectedYear={localYear}
        selectedGovernorate={localGov}
        selectedCenter={localCenter}
        onYearChange={handleYearChange}
        onGovernorateChange={handleGovernorateChange}
        onCenterChange={handleCenterChange}
        onSearch={handleSearch}
        onClearFilters={clearFilters}
      />

      {error && <ErrorBanner message={error.message || 'حدث خطأ'} onRetry={() => { /* SWR will auto-retry or we can trigger mutate */ }} />}

      <div className="flex justify-between items-end mb-6">
        {!loading && !error && students.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-text-muted font-semibold text-sm flex items-center gap-2"
          >
            يعرض <span className="text-primary">{filteredStudents.length}</span> من {students.length} طالب
          </motion.div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : !error && students.length === 0 ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 md:py-24 text-center bg-surface/50 rounded-3xl border border-dashed border-border/80 mx-2 md:mx-0">
          <UsersRound size={48} className="text-border mb-4" />
          <h3 className="text-xl font-bold text-text-main mb-2">لا يوجد طلاب مسجلون بعد</h3>
          <p className="text-text-muted">لم يتم إضافة أي طالب إلى قاعدة البيانات حتى الآن.</p>
        </motion.div>
      ) : !error && filteredStudents.length === 0 ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 md:py-24 text-center bg-surface/50 rounded-3xl border border-dashed border-border/80 mx-2 md:mx-0">
          <SearchX size={48} className="text-border mb-4" />
          <h3 className="text-xl font-bold text-text-main mb-2">لا توجد نتائج مطابقة</h3>
          <p className="text-text-muted">جرب تغيير المحافظة أو المركز للبحث عن طلاب.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredStudents.map((student, index) => (
              <StudentCard 
                key={student.id} 
                student={student} 
                index={index}
                returnPath={searchParams.toString()} 
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
