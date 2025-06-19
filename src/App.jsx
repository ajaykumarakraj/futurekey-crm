// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MiniDrawer from './comman/MiniDrawer';

import FormComponent from './pages/Form';
import WalkUpload from './pages/WalkUpload';
import CustomTable from './pages/Table/customtable';
import ChangePassword from './pages/ChangePassword';
import ContactSupport from './pages/ContactSupport';
import Dashboard from './pages/dashboard';
import SignInPage from './pages/SignInPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import UserForm from './pages/UserForm';
import UserMangementTable from './pages/Table/UserMangementTable';
const App = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/verifyOtp" element={<VerifyOtpPage />} />
      <Route path="/" element={<MiniDrawer />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="leads/create" element={<FormComponent />} />
        <Route path="leads/bulk-upload" element={<WalkUpload />} />
        <Route path="leads/table" element={<CustomTable />} />
        <Route path="user/table" element={<UserMangementTable />} />
        <Route path='user/form' element={<UserForm />} />
        <Route path="table" element={<CustomTable />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="support" element={<ContactSupport />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
