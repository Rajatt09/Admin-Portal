import React from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Login from './pages/Login/Login'
import History from './pages/History/History'
import WhatsappMessage from './pages/WhatsappMessage/WhatsappMessage'
import EmailMessage from './pages/EmailMessage/EmailMessage'
import Dashboard from './pages/Dashboard/Dashboard'
import Events from './pages/Events/Events'
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<h1>Home</h1>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/history' element={<History />}/>
          <Route path='/whatsappmessage' element={<WhatsappMessage />}/>
          <Route path='/emailmessage' element={<EmailMessage />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/events' element={<Events />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App