import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './Header.jsx'
import DashBoard from './DashBoard.jsx'
import Left from './Left.jsx'
import Right from './Right.jsx'
import CreateGroup from './CreateGroup.jsx'
import GroupDetailPage from './GroupDetailPage.jsx'
function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/dashboard'  element={
        <div className='w-screen flex justify-left'>
          <Left/>
          <DashBoard/>
          <Right/>
      </div>
      } />
      <Route path="/groups/new" element={<CreateGroup />} />
      <Route path="/groups/:group_id" element={
        <div className='w-screen flex justify-left'>
          <Left/>
          <GroupDetailPage />
        </div>
        } />
    </Routes>
    </>
  )
}

export default App
