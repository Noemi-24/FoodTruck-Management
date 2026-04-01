import { ThemeProvider } from "./context/ThemeContext"
import ThemeToggle from "./components/ThemeToggle"
import LanguageToggle from "./components/LanguageToggle"
import { LanguageProvider } from "./context/LanguageContext"

function App() {
  return (
    <LanguageProvider>
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <div className="p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Food Truck Management System 
            </h1>

            <div className="flex gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>           
          </div>

        </div>
      </div>
    </ThemeProvider>
    </LanguageProvider>
  )
}


export default App
