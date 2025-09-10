import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LottieLoader from './components/loading/LottieLoader';
import Cookies from 'js-cookie';
import { useAuthStore } from './stores/authStore';
import { ToastProvider } from './contexts/ToastContext';

// Layout Components
import Layout from './components/layout/Layout';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import VehicleDetail from './pages/VehicleDetail';
import Services from './pages/Services';
import News from './pages/News';
import About from './pages/About';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminVehicles from './pages/admin/Vehicles';
import AdminCategories from './pages/admin/Categories';
import AdminNews from './pages/admin/News';
import AdminQuotes from './pages/admin/Quotes';
import AdminSettings from './pages/admin/Settings';
import AdminCustomers from './pages/admin/Customers';
import AdminReports from './pages/admin/Reports';
import AdminBrands from './pages/admin/Brands';
import AdminTopics from './pages/admin/Topics';

// Routes
import { ROUTES } from './lib/constants';

function App() {
  const [appLoading, setAppLoading] = React.useState(true);
  const { checkAuth } = useAuthStore();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
    
    // Simulate app initialization
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 4500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const runAuthCheck = () => {
      const at = Cookies.get('accessToken') || '';
      const rt = Cookies.get('refreshToken') || '';
      checkAuth(at, rt);
    };

    // run immediately on mount
    runAuthCheck();

    // then every 15 minutes
    const intervalId = setInterval(runAuthCheck, 1 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [checkAuth]);
  
  if (appLoading) {
    return <LottieLoader onComplete={() => setAppLoading(false)} duration={6000} />;
  }

  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          
          <Routes>
            {/* Public Routes */}
            <Route
              path={ROUTES.HOME}
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path={ROUTES.VEHICLES}
              element={
                <Layout>
                  <Vehicles />
                </Layout>
              }
            />
            <Route
              path="/vehicles/:id"
              element={
                <Layout>
                  <VehicleDetail />
                </Layout>
              }
            />
            <Route
              path={ROUTES.SERVICES}
              element={
                <Layout>
                  <Services />
                </Layout>
              }
            />
            <Route
              path={ROUTES.NEWS}
              element={
                <Layout>
                  <News />
                </Layout>
              }
            />
            <Route
              path={ROUTES.ABOUT}
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />
            <Route
              path={ROUTES.CONTACT}
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />
            <Route
              path={ROUTES.QUOTE}
              element={
                <Layout>
                  <Quote />
                </Layout>
              }
            />
            
            {/* Auth Routes */}
            <Route path={ROUTES.LOGIN} element={<Login />} />
            
            {/* Protected Admin Routes */}
            <Route
              path={ROUTES.ADMIN_DASHBOARD}
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ADMIN_VEHICLES}
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminVehicles />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ADMIN_BRANDS}
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminBrands />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ADMIN_CATEGORIES}
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminCategories />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ADMIN_TOPICS}
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminTopics />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ADMIN_NEWS}
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminNews />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ADMIN_QUOTES}
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminQuotes />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ADMIN_SETTINGS}
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminSettings />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ADMIN_CUSTOMERS}
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminCustomers />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ADMIN_REPORTS}
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminReports />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;