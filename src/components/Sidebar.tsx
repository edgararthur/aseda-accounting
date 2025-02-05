import { NavLink, useLocation } from 'react-router-dom';
import {FileText, Users, LogOut, Percent, BadgeCent, ArrowRightLeft, Settings, Database, LayoutDashboard, WalletCards, ChevronDown, ChevronUp, BookOpen, CreditCard, Banknote, FileSearch, PieChart, Calendar, Shield, Archive, Globe, Landmark, Clock, FileBarChart, FileSpreadsheet, FileInput, FileOutput, Receipt, Building, Tag, FilePlus, FileCheck, FileX } from 'lucide-react';
import { FaHandHoldingDollar } from "react-icons/fa6";
import { GiExpense } from "react-icons/gi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { useState, useEffect } from 'react';

const menuCategories = [
  {
    title: 'Dashboard',
    items: [
      { icon: LayoutDashboard, label: 'Overview', path: '/', active: true },
    ],
  },
  {
    title: 'Financial Management',
    items: [
      { icon: ArrowRightLeft, label: 'Transactions', path: '/transactions' },
      { icon: BadgeCent, label: 'Sales', path: '/sales' },
    //   { icon: GiExpense, label: 'Expenses', path: '/expenses' },
    //   { icon: FaHandHoldingDollar, label: 'Revenue', path: '/revenue' },
      { icon: BookOpen, label: 'General Ledger', path: '/general-ledger' },
      // { icon: CreditCard, label: 'Accounts Payable', path: '/accounts-payable' },
      // { icon: Banknote, label: 'Accounts Receivable', path: '/accounts-receivable' },
      // { icon: FileSearch, label: 'Bank Reconciliation', path: '/bank-reconciliation' },
      // { icon: Landmark, label: 'Fixed Assets', path: '/fixed-assets' },
      // { icon: Receipt, label: 'Transaction Receipts', path: '/transaction-receipts' },
    ],
  },
  {
    title: 'Tax Management',
    items: [
      { icon: Percent, label: 'Tax Management', path: '/tax-management' },
      // { icon: Percent, label: 'VAT Management', path: '/vat-management' },
      // { icon: Shield, label: 'NHIL Management', path: '/nhil-management' },
      // { icon: FileBarChart, label: 'GETFund Levy', path: '/getfund-levy' },
      // { icon: Calendar, label: 'Income Tax', path: '/income-tax' },
      // { icon: FileSearch, label: 'Tax Filing (GRA)', path: '/tax-filing' },
      // { icon: Clock, label: 'Tax Deadlines', path: '/tax-deadlines' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { icon: Database, label: 'Invoicing & Billing', path: '/invoice' },
      // { icon: MdInventory, label: 'Inventory Management', path: '/inventory' },
      // { icon: Users, label: 'Payroll', path: '/payroll-summary' },
      // { icon: Calendar, label: 'Budgeting', path: '/budgeting' },
      // { icon: Receipt, label: 'Expense Claims', path: '/expense-claims' },
      // { icon: Building, label: 'Vendor Management', path: '/vendor-management' },
      // { icon: Tag, label: 'Purchase Orders', path: '/purchase-orders' },
      // { icon: Receipt, label: 'Operational Receipts', path: '/operational-receipts' },
    ],
  },
  {
    title: 'Reports',
    items: [
      { icon: FileText, label: 'Financial Reports', path: '/financial-reports' },
      { icon: PieChart, label: 'Profit & Loss', path: '/profit-loss' },
      { icon: FileSpreadsheet, label: 'Balance Sheet', path: '/balance-sheet' },
      // { icon: FileBarChart, label: 'Cash Flow Statement', path: '/cash-flow' },
      { icon: FileInput, label: 'Trial Balance', path: '/trial-balance' },
      // { icon: FileOutput, label: 'Aged Receivables', path: '/aged-receivables' },
      // { icon: FileCheck, label: 'Aged Payables', path: '/aged-payables' },
      { icon: Receipt, label: 'Receipt Reports', path: '/receipt-reports' },
    ],
  },
  // {
  //   title: 'Compliance & Audit',
  //   items: [
  //     { icon: Shield, label: 'Audit Trail', path: '/audit-trail' },
  //     { icon: FileX, label: 'Internal Audits', path: '/internal-audits' },
  //     { icon: Clock, label: 'Historical Data', path: '/historical-data' },
  //     { icon: FileSearch, label: 'GRA Compliance Reports', path: '/gra-compliance-reports' },
  //   ],
  // },
  // {
  //   title: 'Settings',
  //   items: [
  //     { icon: Settings, label: 'System Settings', path: '/settings' },
  //     { icon: Users, label: 'User Management', path: '/user-management' },
  //     // { icon: Archive, label: 'Data Backup', path: '/data-backup' },
  //   ],
  // },
];


export function Sidebar() {
  const [openCategories, setOpenCategories] = useState({});
  const location = useLocation();

  // Automatically open the category that contains the active item
  useEffect(() => {
    const activeCategory = menuCategories.find((category) =>
      category.items.some((item) => item.path === location.pathname)
    );
    if (activeCategory) {
      setOpenCategories((prev) => ({
        ...prev,
        [activeCategory.title]: true,
      }));
    }
  }, [location.pathname]);

  const toggleCategory = (title) => {
    setOpenCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="w-64 bg-gray-900 text-white p-4 h-screen flex flex-col">
      <div className="flex items-center gap-3 px-2 mb-8">
        <WalletCards className="h-8 w-8 text-emerald-500" />
        <h1 className="text-sm font-bold text-white">Aseda Accounting</h1>
      </div>

      <nav className="flex-1 h-auto overflow-y-auto">
        {menuCategories.map((category) => (
          <div key={category.title}>
            <button
              onClick={() => toggleCategory(category.title)}
              className="flex items-center justify-between w-full px-4 py-4 text-white rounded-lg transition-colors hover:bg-gray-800 bg-transparent"
            >
              <div className="flex items-center gap-3 bg-transparent">
                <span className="text-xs font-medium">{category.title}</span>
              </div>
              {openCategories[category.title] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {openCategories[category.title] && (
              <div className="pl-6">
                {category.items.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 w-full px-4 py-3 text-white rounded-lg transition-colors hover:bg-gray-800 ${
                        isActive ? 'text-emerald-500 font-semibold' : '' /* Active tab text color */
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="flex-col gap-4">
        <button className="flex items-center bg-transparent gap-3 px-4 py-3 text-white mt-auto hover:bg-none hover:outline-none border-none">
          <LogOut className="w-5 h-5 text-white" />
          <span className="text-gwhite text-xs">Logout</span>
        </button>
      </div>
    </div>
  );
}