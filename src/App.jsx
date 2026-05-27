import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import PaymentSuccess from '@/pages/PaymentSuccess';
import PaymentFailure from '@/pages/PaymentFailure';
import PaymentRedirect from '@/pages/PaymentRedirect';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/fail" element={<PaymentFailure />} />
        <Route path="/payment/redirect" element={<PaymentRedirect />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;