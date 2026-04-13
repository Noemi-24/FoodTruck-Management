import { ThemeProvider } from "./context/ThemeContext"
import { LanguageProvider } from "./context/LanguageContext"
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Nabvar from "./components/Nabvar";
import Orders from "./pages/Orders";
import NewOrder from "./pages/NewOrder";
import Products from "./pages/Products";
import AdminRoute from "./components/AdminRoute";
import Users from "./pages/Users";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>          
          <BrowserRouter> 
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">  
            <Nabvar/>
            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center">
              <Routes>
                <Route path="/" element={<Navigate to = "/dashboard" replace/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/orders/new" element={<ProtectedRoute><NewOrder /></ProtectedRoute>} />
                <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                <Route path="/expenses" element={<AdminRoute><Expenses /></AdminRoute>} />
                <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />
                <Route path="/reports" element={<AdminRoute><Reports /></AdminRoute>} />
              </Routes>  
            </main>
          </div>
          </BrowserRouter>          
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}


export default App


