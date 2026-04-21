import { ThemeProvider } from "./context/ThemeContext"
import { LanguageProvider } from "./context/LanguageContext"
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Orders from "./pages/Orders";
import NewOrder from "./pages/NewOrder";
import Products from "./pages/Products";
import AdminRoute from "./components/AdminRoute";
import Users from "./pages/Users";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import Categories from "./pages/Categories";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>          
          <BrowserRouter> 
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">  
            <Navbar/>
            {/* Main Content */}
            <main className="flex-1 w-full">
              <Routes>
                <Route path="/" element={<Navigate to = "/dashboard" replace/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/orders/new" element={<ProtectedRoute><NewOrder /></ProtectedRoute>} />
                <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                <Route path="/categories" element={<AdminRoute><Categories /></AdminRoute>} />
                <Route path="/expenses" element={<AdminRoute><Expenses /></AdminRoute>} />
                <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />
                <Route path="/reports" element={<AdminRoute><Reports /></AdminRoute>} />
              </Routes>  
              
            </main>
            <footer className="border-t border-gray-200 dark:border-gray-700 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
              <p>
                {t('common.createdBy')}{" "}
                <a
                  href="https://noemi-delgadillo-roldan-portfolio.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Noemi Delgadillo Roldan
                </a>
              </p>
            </footer>
          </div>
          </BrowserRouter>          
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}


export default App


