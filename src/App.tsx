import AppRouter from "./router/appRouter"
import { ThemeProvider } from "@/components/theme/theme-provider"

function App() {

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRouter />
      </ThemeProvider>
  )
}

export default App
