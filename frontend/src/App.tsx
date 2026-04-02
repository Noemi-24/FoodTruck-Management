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
            
            <Nabvar/>
         
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


