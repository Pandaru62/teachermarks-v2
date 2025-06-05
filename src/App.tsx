import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/Home.page'
import Header from './components/ui/navbar'
import PrivateRoute from './utils/PrivateRoute'
import ErrorPage from './utils/ErrorPage'
import TestsPage from './pages/Tests/TestsList.page'
import TestAddPage from './pages/Tests/TestAdd.page'
import SchoolClassPage from './pages/SchoolClass/SchoolClass.page'
import { SignInPage } from './pages/auth/signin.page'
import { SignUpPage } from './pages/auth/signup.page'
import AddSchoolClassPage from './pages/SchoolClass/AddSchoolClass.page'
import SchoolClasseDetailsPage from './pages/SchoolClass/SchoolClassDetails.page'
import EditSchoolClassPage from './pages/SchoolClass/EditSchoolClass.page'
import SkillListPage from './pages/skill/SkillList.page'
import SkillEditPage from './pages/skill/SkillEdit.page'
import StudentsAddPage from './pages/students/studentsAdd.page'
import StudentDetailsPage from './pages/Student/studentDetails.page'
import TestDetailsPage from './pages/Tests/TestDetails.page'
import TestEditPage from './pages/Tests/TestEdit.page'
import SkillAddPage from './pages/skill/SkillAdd.page'

function App() {

  return (
    <>
      <Header />
      <Routes>

        <Route element={<PrivateRoute />} >
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/tests/new" element={<TestAddPage />} />
          <Route path="/tests/:id" element={<TestDetailsPage />} />
          <Route path="/tests/:id/edit" element={<TestEditPage />} />

          
          <Route path="/forms" element={<SchoolClassPage />} />
          <Route path="/forms/new" element={<AddSchoolClassPage />} />
          <Route path="/forms/:id" element={<SchoolClasseDetailsPage />} />
          <Route path="/forms/:id/edit" element={<EditSchoolClassPage />} />

          <Route path="/forms/:id/add-students" element={<StudentsAddPage />} />

          <Route path="/skills" element={<SkillListPage />} />
          <Route path="/skills/new" element={<SkillAddPage />} />
          <Route path="/skills/:id" element={<SkillEditPage />} />

          <Route path="/student/:id" element={<StudentDetailsPage />} />





        </Route>

        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/*" element={<ErrorPage />} />
        
      </Routes>
    </>
  )
}

export default App
