import { ThemeProvider } from "./context/ThemeContext"
import ThemeToggle from "./components/ThemeToggle"
import LanguageToggle from "./components/LanguageToggle"
import { LanguageProvider } from "./context/LanguageContext"
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter> 
            
                  <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                      Food Truck Management System 
                    </h1>

                    <div className="flex gap-2">
                      <ThemeToggle />
                      <LanguageToggle />
                    </div>           
                  </div>
         

            <Routes>
              <Route path="/" element={<Navigate to = "/dashboard" replace/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>            

          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}


export default App


