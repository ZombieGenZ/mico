import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

// Routes
import { ROUTES } from './lib/constants';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1E293B',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#FFD60A',
                secondary: '#1E293B',
              },
            },
          }}
        />
        
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
          
          {/* Placeholder routes for development */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;