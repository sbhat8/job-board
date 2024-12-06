import { ThemeProvider } from "@/components/theme-provider"
import { Login } from './routes/login.tsx'
import { BrowserRouter, Routes, Route } from "react-router"
import { Home } from './routes/home.tsx'
import { Header } from "./components/ui/header.tsx"
import { UserProvider } from "./context/UserContext.tsx"
import { NewJob } from "./routes/jobs/new.tsx"
import { JobDetails } from "./routes/jobs/details.tsx"
import { EditJob } from "./routes/jobs/edit.tsx"
import { DeleteJob } from "./routes/jobs/delete.tsx"
import { SignUp } from "./routes/signup.tsx"

function App() {

  return (
    <UserProvider>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/job/new" element={<NewJob />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/job/:id/edit" element={<EditJob />} />
            <Route path="/job/:id/delete" element={<DeleteJob />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  )
}

export default App
