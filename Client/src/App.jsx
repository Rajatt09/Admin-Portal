import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import History from "./pages/History/History";

import EmailMessage from "./pages/EmailMessage/EmailMessage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Events from "./pages/Events/Events";
import { Toaster } from "react-hot-toast";
import FormBuilder from "./pages/OpticaForms/CreateOpticaForm";
import OpticaFormsDashboard from "./pages/OpticaForms/OpticFormsDashboard";

import ProtectedRoute from "./ProtectedRoute";

import WhatsAppMessage from "./pages/WhatsappMessage/WhatsappMessage";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Unprotected Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/whatsappmessage" element={<WhatsAppMessage />} />
            <Route path="/emailmessage" element={<EmailMessage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route
              path="/create/new-form"
              element={<FormBuilder formType="create" />}
            />
            <Route path="/edit/:id" element={<FormBuilder formType="edit" />} />
            <Route path="/optica-forms" element={<OpticaFormsDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
