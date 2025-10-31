// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import { FiSearch, FiChevronUp, FiChevronDown, FiEye, FiTrash2, FiDownload, FiMenu, FiX } from "react-icons/fi";

// const SERVER_URL = import.meta.env.VITE_API_BASE_URL;

// // Modal Component for viewing full message
// const MessageModal = ({ contact, onClose }) => {
//   if (!contact) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 w-full max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
//         <h3 className="text-lg md:text-xl font-semibold text-pink-600 mb-3 md:mb-4">
//           Message from {contact.name}
//         </h3>
//         <div className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-700">
//           <p><strong>Email:</strong> {contact.email}</p>
//           <p><strong>Phone:</strong> {contact.phone || "-"}</p>
//           <p><strong>Received:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
//           <hr className="my-2"/>
//           <p className="mt-2 break-words">{contact.message}</p>
//         </div>
//         <button
//           onClick={onClose}
//           className="mt-4 md:mt-6 w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-300"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// // Mobile Card Component for small screens
// const ContactCard = ({ contact, onView, onDelete }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 mb-3 border border-gray-200">
//       <div className="flex justify-between items-start mb-2">
//         <div className="flex-1">
//           <h3 className="font-semibold text-gray-800 truncate">{contact.name}</h3>
//           <p className="text-sm text-gray-600 truncate">{contact.email}</p>
//         </div>
//         <div className="flex space-x-2 ml-2">
//           <button 
//             onClick={() => onView(contact)}
//             className="text-indigo-600 hover:text-indigo-900 p-1"
//           >
//             <FiEye size={18} />
//           </button>
//           <button 
//             onClick={() => onDelete(contact._id)}
//             className="text-red-600 hover:text-red-900 p-1"
//           >
//             <FiTrash2 size={18} />
//           </button>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
//         <div>
//           <span className="font-medium">Phone:</span>
//           <p className="truncate">{contact.phone || "-"}</p>
//         </div>
//         <div>
//           <span className="font-medium">Date:</span>
//           <p>{new Date(contact.createdAt).toLocaleDateString()}</p>
//         </div>
//       </div>
      
//       <div className="text-xs text-gray-500 border-t pt-2">
//         Message preview: {contact.message.substring(0, 60)}...
//       </div>
//     </div>
//   );
// };

// const ContactTable = () => {
//   const [contacts, setContacts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'descending' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
  
//   const itemsPerPage = 10;

//   // Check screen size for responsive behavior
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//       setShowMobileMenu(false);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
    
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//      const res = await axios.get(`${SERVER_URL}/api/contact/messages`, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`
//           }
//         });
//         setContacts(res.data);
//       } catch (error) {
//         console.error("Error fetching contacts:", error);
//       }
//     };

//     fetchContacts();
//   }, []);
    
//   // Handle Delete Action
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this message?")) {
//         try {
//            await axios.delete(`${SERVER_URL}/api/contact/messages/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("authToken")}`
//                 }
//             });
//             setContacts(contacts.filter(c => c._id !== id));
//         } catch (error) {
//             console.error("Error deleting contact:", error);
//         }
//     }
//   };

//   const filteredAndSortedContacts = useMemo(() => {
//     let sortedContacts = [...contacts];
//     if (sortConfig.key) {
//       sortedContacts.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortedContacts.filter(contact =>
//       contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (contact.phone && contact.phone.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//   }, [contacts, searchTerm, sortConfig]);

//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };
  
//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredAndSortedContacts.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredAndSortedContacts.length / itemsPerPage);

//   // Function to handle exporting data to Excel
//   const handleExport = () => {
//     const dataToExport = filteredAndSortedContacts.map(contact => ({
//       Name: contact.name,
//       Email: contact.email,
//       Phone: contact.phone || "-",
//       Message: contact.message,
//       Date: new Date(contact.createdAt).toLocaleString(),
//     }));

//     const ws = XLSX.utils.json_to_sheet(dataToExport);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Messages");
//     XLSX.writeFile(wb, "ContactMessages.xlsx");
//   };

//   const SortableHeader = ({ label, columnKey }) => (
//     <th 
//       className="px-2 py-3 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//       onClick={() => requestSort(columnKey)}
//     >
//       <div className="flex items-center">
//         {label}
//         {sortConfig.key === columnKey && (
//           sortConfig.direction === 'ascending' ? 
//           <FiChevronUp className="ml-1" size={14}/> : 
//           <FiChevronDown className="ml-1" size={14}/>
//         )}
//       </div>
//     </th>
//   );

//   return (
//     <>
//       <div className="p-3 md:p-6 bg-gray-50 min-h-screen">
//         <div className="flex items-center justify-between mb-4 md:mb-6">
//           <button
//             onClick={() => setShowMobileMenu(!showMobileMenu)}
//             className="md:hidden p-2 rounded-lg bg-white shadow-sm"
//           >
//             {showMobileMenu ? <FiX size={20} /> : <FiMenu size={20} />}
//           </button>
          
//           <h2 className="text-xl md:text-3xl font-bold text-center flex-1 text-gray-800">
//             Contact Messages
//           </h2>
          
//           <div className="w-8 md:hidden"></div> {/* Spacer for mobile layout */}
//         </div>

//         {/* Search and Export Section */}
//         <div className={`bg-white p-3 md:p-4 rounded-lg shadow-md mb-4 transition-all duration-300 ${
//           showMobileMenu ? 'block' : 'hidden md:flex'
//         } md:flex justify-between items-center space-y-3 md:space-y-0`}>
//           <div className="relative w-full md:w-auto">
//             <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by name, email, or phone..."
//               className="pl-10 p-2 border rounded-lg w-full md:w-64"
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>
//           <button
//             onClick={handleExport}
//             className="flex items-center justify-center bg-green-500 text-white py-2 px-3 md:px-4 rounded-lg hover:bg-green-600 transition duration-300 w-full md:w-auto text-sm md:text-base"
//           >
//             <FiDownload className="mr-2" />
//             Export to Excel
//           </button>
//         </div>

//         {/* Desktop Table */}
//         {!isMobile && (
//           <div className="overflow-x-auto shadow-lg rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <SortableHeader label="Name" columnKey="name" />
//                   <SortableHeader label="Email" columnKey="email" />
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Phone
//                   </th>
//                   <SortableHeader label="Date" columnKey="createdAt" />
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {currentItems.length > 0 ? (
//                   currentItems.map((contact) => (
//                     <tr key={contact._id} className="hover:bg-pink-50 transition-colors">
//                       <td className="px-4 py-4 whitespace-nowrap text-sm">{contact.name}</td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm">{contact.email}</td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm">{contact.phone || "-"}</td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm">
//                         {new Date(contact.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
//                         <button 
//                           onClick={() => setSelectedContact(contact)} 
//                           className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors"
//                           title="View Message"
//                         >
//                           <FiEye size={18} />
//                         </button>
//                         <button 
//                           onClick={() => handleDelete(contact._id)} 
//                           className="text-red-600 hover:text-red-900 transition-colors"
//                           title="Delete Message"
//                         >
//                           <FiTrash2 size={18} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8 text-gray-500">
//                       No messages found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Mobile Cards */}
//         {isMobile && (
//           <div className="space-y-3">
//             {currentItems.length > 0 ? (
//               currentItems.map((contact) => (
//                 <ContactCard
//                   key={contact._id}
//                   contact={contact}
//                   onView={setSelectedContact}
//                   onDelete={handleDelete}
//                 />
//               ))
//             ) : (
//               <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
//                 No messages found.
//               </div>
//             )}
//           </div>
//         )}
        
//         {/* Pagination Controls */}
//         {totalPages > 1 && (
//           <div className="py-4 flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-4">
//             <div className="flex space-x-2">
//               <button 
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors text-sm"
//               >
//                 Previous
//               </button>
//               <button 
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors text-sm"
//               >
//                 Next
//               </button>
//             </div>
//             <span className="px-3 py-2 text-sm text-gray-600">
//               Page {currentPage} of {totalPages}
//             </span>
//             <div className="flex items-center space-x-1">
//               <span className="text-sm text-gray-600">Go to:</span>
//               <select
//                 value={currentPage}
//                 onChange={(e) => setCurrentPage(Number(e.target.value))}
//                 className="border rounded px-2 py-1 text-sm"
//               >
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                   <option key={page} value={page}>{page}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         )}

//         {/* Results Count */}
//         <div className="text-center text-sm text-gray-500 mt-4">
//           Showing {currentItems.length} of {filteredAndSortedContacts.length} messages
//         </div>
//       </div>

//       <MessageModal contact={selectedContact} onClose={() => setSelectedContact(null)} />
//     </>
//   );
// };

// export default ContactTable;