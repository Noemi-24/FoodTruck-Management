import { ThemeProvider } from "./context/ThemeContext"
import ThemeToggle from "./components/ThemeToggle"

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <div className="p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Food Truck Management System 🌮 - TypeScript
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
