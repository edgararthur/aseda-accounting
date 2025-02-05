import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import Select from 'react-select'
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Plus, Filter, Edit, Trash, User, Eye, Search, X, Calendar, DollarSign, FileText, Tag, Send, Printer } from 'lucide-react';
import { Sidebar } from '../../components/Sidebar';
import { Settings, Bell } from 'lucide-react';
import { LuFileSpreadsheet, LuPrinter } from "react-icons/lu";
import { FaFilePdf } from "react-icons/fa6";


import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useReactToPrint } from 'react-to-print';
import ReceiptGenerator from '../reports/RecieptGenerator';

interface Invoice {
	id: number;
	invoiceNumber: string;
	clientName: string;
	dueDate: string;
	amount: number;
	status: string;
	recurring: boolean;
}

export function Invoice() {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [filterOpen, setFilterOpen] = useState(false);
	const [transactionOpen, setTransactionOpen] = useState(false)

	const [invoices, setInvoices] = useState<Invoice[]>([]);
	
	const [newInvoice, setNewInvoice] = useState<Invoice>({
		id: 0,
		invoiceNumber: '',
		clientName: '',
		dueDate: '',
		amount: 0,
		status: 'Unpaid',
		recurring: false,
	});

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [transactionToDelete, setTransactionToDelete] = useState(null);
	const [transactionDetails, setTransactionDetails] = useState(null);
	const [showDetailsModal, setShowDetailsModal] = useState(false)

	const [isVisible, setIsVisible] = useState(true)
	const handleDeleteClick = (transactionId: string) => {
		setTransactionToDelete(transactionId);
		setShowDeleteModal(true);
	};

	const confirmDeleteTransaction = () => {
		setInvoices(invoices.filter(t => t.id !== transactionToDelete));
		setShowDeleteModal(false);
		toast.error("Transaction deleted successfully!");
	};

	// handle transactions view
	const handleViewDetailsClick = (ledger: typeof invoices[0]) => {
		setTransactionDetails(ledger);
		setShowDetailsModal(true);
	};

  // handle excel sheet export
  const handleExportToExcel = () => {
    // Convert the ledger data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(invoices);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoice');
  
    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'invoice.xlsx');
  
    toast.success('Exported to Excel successfully!');
  };

// handle add invoice
  const handleAddInvoice = () => {
    if (!newInvoice.invoiceNumber || !newInvoice.clientName || !newInvoice.dueDate || newInvoice.amount <= 0) {
      toast.error('Please fill in all fields correctly.');
      return;
    }
    setInvoices([...invoices, { ...newInvoice, id: invoices.length + 1 }]);
    setNewInvoice({ id: 0, invoiceNumber: '', clientName: '', dueDate: '', amount: 0, status: 'Unpaid', recurring: false });
    toast.success('Invoice added successfully!');
  };

  const handleDeleteInvoice = (id: number) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
    toast.error('Invoice deleted successfully!');
  };

  const handleSendInvoice = (id: number) => {
    toast.success(`Invoice ${id} sent!`);
  };

  const handleEditInvoice = (id: number) => {
    const invoiceToEdit = invoices.find(invoice => invoice.id === id);
    if (invoiceToEdit) {
      setNewInvoice(invoiceToEdit);
    }
  };

  // handle data printing
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

	const handleExport = () => {
		toast.success('Export clicked!');
	};

	const [selectedReceipt, setSelectedReceipt] = useState<Transaction | null>(null);

	return (
		<div className="flex w-dvw h-full bg-blue-50 font-poppins">
			<Sidebar />

			<main className="w-full bg-faded flex-1 bg-blue-50">
				<div className="max-w-8xl">
					<header className="bg-white shadow-md">
						<div className="flex items-center justify-end px-8 py-2">
							<div className="flex items-center gap-4">
								<button className="relative p-2 bg-transparent text-gray-400 hover:text-gray-600">
									<Bell size={19} className="bg-transparent" />
									<span className="absolute top-1 right-2  h-2 w-2 bg-red-500 rounded-full"></span>
								</button>
								<div className="flex items-center gap-3 cursor-pointer">
									<img
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt="Profile"
									className="h-8 w-8 rounded-full"
									/>
									<div>
									<p className="text-xs font-medium">Kwame Mensah</p>
									<p className="text-xs text-gray-500">Administrator</p>
									</div>
								</div>
							</div>
						</div>
					</header>

					<div className="p-6">
						<ToastContainer />
						<header className="flex justify-between items-center mb-4">
							<div className="flex justify-between align-middle w-full">
								<div>
									<h1 className="text-xl font-semibold text-gray-700">Invoice List</h1>
									<p className='text-xs font-medium text-gray-600'>Manage your invoice</p>
								</div>
								{isVisible && (<div className="flex gap-2">
									<button onClick={() => {
										handleAddInvoice
										setTransactionOpen(!transactionOpen);
										setIsVisible(!isVisible)
										}} className="bg-blue-500 text-white px-2 rounded flex items-center text-xs">
										<Plus size={16} /> Create New Invoice
									</button>
								</div>
								)}
							</div>
						</header>

						{filterOpen && (
							<div className="bg-white p-4 rounded mb-4">
								<div className="flex gap-4 mb-4">
									<div>
										<label className="block text-xs font-medium text-gray-700">Date Range</label>
										<div className="flex gap-2">
											<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" className="border p-2 rounded bg-transparent outline-none text-xs" />
											<DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="End Date" className="border p-2 rounded bg-transparent outline-none text-xs" />
										</div>
									</div>
									<div>
										<label className="block text-xs font-medium text-gray-700">Transaction Type</label>
										<select className="border p-2 rounded w-full bg-transparent outline-none">
											<option>All</option>
											<option>Income</option>
											<option>Expense</option>
											<option>Transfer</option>
										</select>
									</div>
									<div>
										<label className="block text-xs font-medium text-gray-700">Payment Method</label>
										<select className="border p-2 rounded w-full bg-transparent outline-none">
											<option>All</option>
											<option>Cash</option>
											<option>Bank Transfer</option>
											<option>Credit Card</option>
										</select>
									</div>
									<div>
										<label className="block text-xs font-medium text-gray-700">Status</label>
										<select className="border p-2 rounded w-full bg-transparent outline-none">
											<option>All</option>
											<option>Pending</option>
											<option>Completed</option>
											<option>Canceled</option>
										</select>
									</div>
								</div>
							</div>
						)}
						{/* delete model */}
						{showDeleteModal && (
							<div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
								<div className="bg-white p-6 rounded-lg shadow-lg w-96 h-48">
									<h2 className="text-lg font-semibold text-red-400 text-center font-poppins pt-4">Delete Transaction?</h2>
									<p className='text-xs text-center font-normal text-gray-600'>Are you sure you want to delete this transaction? This action cannot be undone.</p>
									<div className="mt-4 flex align-middle space-x-2 w-full">
									<Button onClick={() => setShowDeleteModal(false)} className='border-none bg-gray-500 w-full'>Cancel</Button>
									<Button onClick={confirmDeleteTransaction} variant="destructive" className='border-none w-full'>
										Delete
									</Button>
									</div>
								</div>
							</div>
						)}

						{/* transactions detail modal */}
						{showDetailsModal && transactionDetails && (
							<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
							<div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
							  {/* Header */}
							  <div className="flex items-center justify-between p-4 border-b">
								<h2 className="text-xl font-semibold text-gray-800">Transaction Details</h2>
							  </div>
					  
							  {/* Content */}
							  <div className="p-6 space-y-4">
								{/* transaction id */}
								<div className="flex items-center space-x-3 justify-between">
									<p className="text-sm text-gray-500">Transaction Id</p>
									<p className={`text-sm font-medium`}>
									  <span>#</span>{transactionDetails.id}
									</p>
								</div>
								{/* Amount */}
								<div className="flex items-center space-x-3 justify-between">
									<p className="text-sm text-gray-500">Amount</p>
									<p className={`text-sm font-medium ${
									  transactionDetails.type === 'credit' ? 'text-green-600' : 'text-red-600'
									}`}>
									  {transactionDetails.type === 'credit' ? '+' : '-'}${Math.abs(transactionDetails.amount).toFixed(2)}
									</p>
								</div>
					  
								{/* Date */}
								<div className="flex items-center space-x-3 justify-between">
									<p className="text-sm text-gray-500">Date</p>
									<p className="text-gray-800 text-sm">{transactionDetails.date}</p>
								</div>
								{/* Category */}
								<div className="flex items-center space-x-3 justify-between">
									<p className="text-sm text-gray-500">Category</p>
									<p className="text-gray-800">{transactionDetails.category}</p>
								</div>

								<div className="flex items-center space-x-3 justify-between">
									<p className="text-sm text-gray-500">Payment Method</p>
									<p className="text-gray-800">{transactionDetails.payment_method}</p>
								</div>
					  
								{/* Description */}
								<div className="flex items-center space-x-3 justify-between">
									<p className="text-sm text-gray-500">Description</p>
									<p className="text-gray-800">{transactionDetails.description}</p>
								</div>

								{/* Status */}
								<div className="flex items-center space-x-3 justify-between">
									<p className="text-sm text-gray-500">Status</p>
									<p className="text-gray-800">{transactionDetails.status}</p>
								</div>
							  </div>
					  
							  {/* Footer */}
							  <div className="border-t p-4">
								<button onClick={() => setShowDetailsModal(false)}
								  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors" 
								>
								  Close
								</button>
							  </div>
							</div>
						  </div>
						)}

						{transactionOpen && (
							<div className="bg-white p-6 rounded-lg shadow-md">
					  
							  {/* Aligned Fields: Date, Category, Transaction Type, Status */}
							  <div className="mb-4">
								<div className="flex middle justify-between pb-3">
									<h2 className="text-xl font-semibold mb-2">Create New Invoice</h2>
									<button onClick={() => {
										setIsVisible(!isVisible)
										setTransactionOpen(!transactionOpen)
									}} className='bg-transparent border-none'>
										<X size={16} className='bg-transparent text-red-500' />
									</button>
								</div>
								<div>
									<p>Client Name</p>
									<input
										type="text"
										placeholder="Client Name"
										value={newInvoice.clientName}
										onChange={(e) => setNewInvoice({ ...newInvoice, clientName: e.target.value })}
										className="border p-2 rounded w-full mb-2 bg-transparent"
									/>
								</div>
								<input
									type="date"
									value={newInvoice.dueDate}
									onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
									className="border p-2 rounded w-full mb-2 bg-transparent"
								/>
								<input
									type="number"
									placeholder="Amount"
									value={newInvoice.amount}
									onChange={(e) => setNewInvoice({ ...newInvoice, amount: parseFloat(e.target.value) })}
									className="border p-2 rounded w-full mb-2 bg-transparent"
								/>
								{/* <label className="flex items-center mb-2 bg-transparent">
									<input
									type="checkbox"
									checked={newInvoice.recurring}
									onChange={(e) => setNewInvoice({ ...newInvoice, recurring: e.target.checked })}
									className="mr-2 bg-transparent"
									/>
									Recurring Invoice
								</label> */}
								</div>
					  
							  {/* Add Transaction Button */}
							  <div className="col-span-full flex justify-center">
								<button
								  onClick={() => {
									setTransactionOpen(!transactionOpen)
									handleAddInvoice()
									setIsVisible(!isVisible)
								  }}
								  className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 justify-center text-sm font-medium transition"
								>
								  <Plus size={16} /> Add Invoice
								</button>
							  </div>
							</div>
						)}

						{isVisible && (
							<div className='min-w-full h-full p-3 border-gray-200 border bg-white rounded-md'>
								<div className="flex align-middle justify-between w-full">
									<div className="flex align-middle">
										{/* <button onClick={() => setFilterOpen(!filterOpen)} className="text-gray-700 bg-transparent rounded flex items-center mr-2 border-none">
											<Filter size={16} color='blue' />
										</button> */}
										<div className='flex items-center border border-gray-300 bg-transparent rounded px-2'>
											<Search size={16}/>
											<input type="text" placeholder="Search by keyword" className="border-none text-gray-600 p-2 font-poppins outline-none bg-transparent text-xs font-medium" />
										</div>
									</div>
									<div className="flex align-middle">
										<button onClick={handleExport} className="bg-transparent text-red-600 border-none px-2 py-2 rounded flex items-center">
											<FaFilePdf size={20}/>
										</button>
										<button onClick={handleExportToExcel} className="bg-transparent text-green-600 border-none px-2 py-2 rounded flex items-center">
                      <LuFileSpreadsheet size={20} />
                    </button>
										<button onClick={handlePrint} className="bg-transparent text-gray-600 border-none px-2 py-2 rounded flex items-center">
                      <LuPrinter size={20} />
                    </button>
									</div>
								</div>
								<div ref={componentRef}>
									<table className="min-w-full rounded-lg mt-5">
										<thead className='text-gray-500 text-xs font-normal'>
											<tr className='text-xs font-medium'>
												<th className='py-2 px-4 border-b'>Invoice Number</th>
												<th className="py-2 px-4 border-b">Due Date</th>
												<th className="py-2 px-4 border-b">Client Name</th>
												<th className="py-2 px-4 border-b">Amount(GHS)</th>
												<th className="py-2 px-4 border-b">Status</th>
												<th className="py-2 px-4 border-b">Actions</th>
											</tr>
										</thead>
										<tbody>
											{invoices.map((invoice) => (
											<tr key={invoice.id} className='text-center text-gray-500 text-sm font-normal'>
												<td className='py-2 px-4 border-b'>INV00{invoice.id}</td>
												<td className='py-2 px-4 border-b'>{invoice.clientName}</td>
												<td className="py-2 px-4 border-b">{invoice.dueDate}</td>
												<td className="py-2 px-4 border-b">GHS {invoice.amount.toFixed(2)}</td>
												<td className="py-2 px-4 border-b">
												<span className={`px-2 py-1 rounded text-white ${invoice.status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'}`}>
													{invoice.status}
												</span>
												</td>
												<td className="py-2 px-2 border-b">
												<button onClick={() => handleEditInvoice(invoice.id)} className="text-blue-500 bg-white hover:text-blue-700 border-none">
													<Printer size={16} />
												</button>
												<button onClick={() => handleSendInvoice(invoice.id)} className="text-green-500 bg-white hover:text-green-700 border-none">
													<Send size={16} />
												</button>
												<button onClick={() => handleDeleteInvoice(invoice.id)} className="text-red-500 bg-white hover:text-red-700">
													<Trash size={16} />
												</button>
												</td>
											</tr>
											))}
										</tbody>
									</table>
								</div>

								<footer className="flex justify-between items-center mt-4">
									<div>
										<p className='text-xs font-poppins font-medium text-gray-700'>1 - 10 of 50 entries</p>
									</div>
									<div className="flex gap-2">
										<button className="px-3 py-1 border border-gray-500 bg-transparent rounded text-gray-500 text-xs">Previous</button>
										<button className="px-3 py-1 rounded bg-blue-400 text-white text-xs">Next</button>
									</div>
								</footer>
							</div>
						)}
					</div>
				</div>
				
			</main>
		</div>
	);
} 