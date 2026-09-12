/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { CourseProvider } from './CourseContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ContentList } from './pages/ContentList';
import { Courses } from './pages/Courses';
import { Login } from './pages/Login';
import { ArticleDetail } from './pages/ArticleDetail';
import { Subscription } from './pages/Subscription';
import { CourseLesson } from './pages/CourseLesson';
import { CourseDetail } from './pages/CourseDetail';
import { Schedule } from './pages/Schedule';
import { MobileAppLayout } from './components/MobileAppLayout';
import { MobileDashboard } from './pages/MobileDashboard';
import { MobileProfile } from './pages/MobileProfile';
import { MobileMyCourses } from './pages/MobileMyCourses';
import { Checkout } from './pages/Checkout';
import { CheckoutSuccess } from './pages/CheckoutSuccess';

import { AdminLayout } from './components/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCourseList } from './pages/admin/AdminCourseList';
import { AdminAddCourse } from './pages/admin/AdminAddCourse';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

// Protect mobile app routes
const ProtectedAppRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Protect admin routes
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <BrowserRouter>
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900">
          <Routes>
            {/* Public Layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/article" element={<ContentList type="article" title="Artikel" description="Berita dan tulisan terbaru seputar teknologi dan rekayasa perangkat lunak." />} />
              <Route path="/blog" element={<ContentList type="blog" title="Blog" description="Cerita, opini, dan pemikiran dari tim Niits." />} />
              <Route path="/penelitian" element={<ContentList type="penelitian" title="Penelitian" description="Jurnal, studi kasus, dan publikasi riset mendalam kami." />} />
              <Route path="/knowledge" element={<ContentList type="knowledge" title="Knowledge" description="Pusat basis pengetahuan, panduan, dan dokumentasi komprehensif." />} />
              <Route path="/courses" element={<Courses filterType="course" />} />
              <Route path="/bootcamps" element={<Courses filterType="bootcamp" />} />
              <Route path="/subscription" element={<Subscription />} />
            </Route>
            
            {/* Login without Header */}
            <Route path="/login" element={<Login />} />

            {/* Mobile App Layout (Post-Login) */}
            <Route path="/app" element={
              <ProtectedAppRoute>
                <MobileAppLayout />
              </ProtectedAppRoute>
            }>
              <Route index element={<MobileDashboard />} />
              <Route path="articles" element={<ContentList type="article" title="Artikel" description="Berita dan tulisan terbaru seputar teknologi dan rekayasa perangkat lunak." />} />
              <Route path="my-courses" element={<MobileMyCourses />} />
              <Route path="courses" element={<Courses filterType="course" />} />
              <Route path="bootcamps" element={<Courses filterType="bootcamp" />} />
              <Route path="profile" element={<MobileProfile />} />
            </Route>

            {/* Admin Layout */}
            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="courses" element={<AdminCourseList />} />
              <Route path="courses/add" element={<AdminAddCourse />} />
              <Route path="*" element={<AdminDashboard />} />
            </Route>

            {/* Fullscreen Pages */}
            <Route path="/schedule" element={
              <ProtectedAppRoute>
                <Schedule />
              </ProtectedAppRoute>
            } />
            <Route path="/content/:id" element={
              <main className="min-h-screen bg-white">
                <ArticleDetail />
              </main>
            } />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/course/:courseId/lesson/:lessonId" element={
              <ProtectedAppRoute>
                <CourseLesson />
              </ProtectedAppRoute>
            } />
            <Route path="/checkout/:courseId" element={
              <ProtectedAppRoute>
                <Checkout />
              </ProtectedAppRoute>
            } />
            <Route path="/checkout/success/:courseId" element={
              <ProtectedAppRoute>
                <CheckoutSuccess />
              </ProtectedAppRoute>
            } />
          </Routes>
        </div>
      </BrowserRouter>
      </CourseProvider>
    </AuthProvider>
  );
}
