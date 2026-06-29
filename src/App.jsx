import { Routes, Route } from 'react-router-dom';
import StudentListPage from './pages/StudentListPage';
import StudentDetailPage from './pages/StudentDetailPage';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<StudentListPage />} />
        <Route path="/student/:id" element={<StudentDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
