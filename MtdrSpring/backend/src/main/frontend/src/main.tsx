import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider, SignedOut, SignedIn } from '@clerk/clerk-react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import LoginPage from "./auth/login.tsx"
import RegisterPage from './auth/register.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={import.meta.env.pk_test_ZW1pbmVudC1idXp6YXJkLTYwLmNsZXJrLmFjY291bnRzLmRldiQ}>
      <Router>
        <SignedIn>
          <App />
        </SignedIn>
        <SignedOut>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </SignedOut>
      </Router>
    </ClerkProvider>
  </StrictMode>
)
