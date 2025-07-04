import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Jobs from './components/pages/Jobs';
import JobDetail from './components/pages/JobDetail';
import Apply from './components/pages/Apply';
import About     from './components/pages/About'
import JobSeekers from './components/pages/JobSeekers';
import ServiceRequest from './components/pages/ServiceRequest';
import Employers from './components/pages/Employers';
import Contact from './components/pages/Contact';
import AdminLogin from './components/pages/AdminLogin';
import AdminJobs  from './components/pages/AdminJobs';
import Register from './components/pages/Register';
import Login    from './components/pages/Login';
import MyApplications from './components/pages/MyApplications';
import ProtectedRoute from './components/ProtectedRoute';

// ... other imports

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/jobs/:id/apply" element={<ProtectedRoute> <Apply /> </ProtectedRoute>}/>
      <Route path="/about" element={<About />} />
      <Route path="/job-seekers" element={<JobSeekers />} />
      <Route path="/service-request/:packageName" element={<ServiceRequest />} />
      <Route path="/employers" element={<Employers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/jobs" element={<AdminJobs />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login"    element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute> <MyApplications /> </ProtectedRoute>} /> 

      
      {/* other routes */}
    </Routes>
  )
}
