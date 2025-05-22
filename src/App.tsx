import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/Home.page'
import Header from './components/ui/navbar'
import PrivateRoute from './utils/PrivateRoute'
import ErrorPage from './utils/ErrorPage'
import TestsPage from './pages/Tests/Tests.page'
import TestAddPage from './pages/Tests/TestAdd.page copy'
import SchoolClassPage from './pages/SchoolClass/SchoolClass.page'
import { SignInPage } from './pages/auth/signin.page'
import { SignUpPage } from './pages/auth/signup.page'
import AddSchoolClassPage from './pages/SchoolClass/AddSchoolClass.page'

function App() {

  return (
    <>
      <Header />
      <Routes>

        <Route element={<PrivateRoute />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/test/new" element={<TestAddPage />} />
          
          <Route path="/forms" element={<SchoolClassPage />} />
          <Route path="/forms/new" element={<AddSchoolClassPage />} />


        </Route>
        
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />


        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
