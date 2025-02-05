import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { QueryClient } from '@tanstack/react-query';
// import { router } from '@/lib/routes';
// import { Toaster } from '@/components/ui/toaster';
import { Dashboard } from './components/dashboard/Dashboard';
import { FinancialOverview } from './components/dashboard/FinancialOverview';
import { Sales } from './components/sales/Sales'
import { Invoice } from './components/dashboard/Invoice';
import { InvoicingBilling } from './components/InvoicingBilling';
// import { Tax } from './components/tax/Tax';
import { Ledger } from './components/ledger/Ledger';
import { Payables } from './components/payables/Payables';
import TaxManagement from './components/tax/TaxManagment';
import ReceiptsReport from './components/reports/RecieptsReport';

// const queryClient = new QueryClient();

export default function App() {
  return (
    // <QueryClientProvider client={queryClient}>
    //   <RouterProvider router={router} />
    //   <Toaster />
    // </QueryClientProvider>
    <div className='bg-blue-50 min-h-screen'>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/transactions' element={<FinancialOverview />} />
          <Route path='/sales' element={<Sales />} />
          <Route path='/invoice' element={<Invoice />} />
          <Route path='/accounts-payable' element={<Payables />} />
          <Route path="/invoicing-billing" element={<InvoicingBilling />} />
          <Route path="/tax-management" element={<TaxManagement />} />
          <Route path="/general-ledger" element={<Ledger />} />
          <Route path="/receipt-reports" element={<ReceiptsReport />} />
        </Routes>
      </Router>
    </div>
  );
}