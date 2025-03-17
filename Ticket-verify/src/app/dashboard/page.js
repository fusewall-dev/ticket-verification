"use client";
import { useEffect, useState } from 'react';
import ProtectedRoute from '../ProtectedRoute';




const DashboardPage = () => {
  
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const recordsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/paystack');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
    setCurrentPage(1); // Reset to first page when transactions or searchTerm changes
  }, [searchTerm]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (searchTerm) {
      if (currentPage !== nPagesFiltered) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      if (currentPage !== nPages) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.id.toString().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(transaction.created_at).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const recordsFiltered = filteredTransactions.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(transactions.length / recordsPerPage);
  const nPagesFiltered = Math.ceil(filteredTransactions.length / recordsPerPage);

  return (
    <ProtectedRoute>
    <div className="w-[100vw] p-4 md:p-8 bg-gradient-to-r from-white via-gray-200 to-cyan-100">
      <div className='flex flex-row justify-between items-center mb-4'>
      <h1 className="text-xl md:text-3xl font-bold mb-6">Dashboard</h1> 
      <button
            className="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            onClick={() => {
              
              localStorage.removeItem('session');
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
      </div>
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-300"
      />
      
      <div className=" md:w-full overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-blue-300 via-gray-300 to-blue-600 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Transaction ID
              </th>
              <th scope="col" className="py-3 px-6">
                Reference
              </th>
              <th scope="col" className="py-3 px-6">
                Customer Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Amount
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Currency
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              recordsFiltered.map((transaction) => (
                <tr key={transaction.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {transaction.id}
                  </td>
                  <td className={`py-4 px-6 ${transaction.status.toLowerCase() === 'success' ? 'text-green-500' : 'text-gray-500'}`}>
                    {transaction.reference}
                  </td>
                  <td className="py-4 px-6">{transaction.customer.first_name + ' ' + transaction.customer.last_name}</td>
                  <td className="py-4 px-6">{transaction.customer.email}</td>
                  <td className="py-4 px-6">₦{transaction.amount / 100}</td>
                  <td className="py-4 px-6">{transaction.status}</td>
                  <td className="py-4 px-6">{transaction.currency}</td>
                  <td className="py-4 px-6">{new Date(transaction.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50">
          Previous
        </button>
        {Array.from({ length: searchTerm ? nPagesFiltered : nPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => changePage(index + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={searchTerm ? currentPage === nPagesFiltered : currentPage === nPages} className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
