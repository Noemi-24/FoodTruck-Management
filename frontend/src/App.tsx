import { ThemeProvider } from "./context/ThemeContext"
import { LanguageProvider } from "./context/LanguageContext"
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Nabvar from "./components/Nabvar";

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


