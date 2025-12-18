import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Define the type for a contact message
interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

const ContactTable = () => {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/contact/messages`);
        setContacts(response.data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching contacts:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/contact/messages/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
    } catch (err: any) {
      console.error("Error deleting message:", err);
      setError("Failed to delete message");
    }
  };

  if (loading) {
    return (
      <div className="w-full p-4 sm:p-6 bg-gray-50 flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    // UPDATED: Added w-full and overflow-hidden to prevent sidebar shifting
    <div className="w-full p-4 sm:p-6 bg-gray-50 overflow-hidden">
      <h2 className="text-3xl font-serif font-bold text-gray-800 text-center mb-6">Contact Form Messages</h2>
      
      {error && (
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg mb-4 shadow-sm">{error}</p>
        </div>
      )}

      {/* 
        Responsive Container: 
        On mobile/tablet, it shows cards. 
        On desktop (md+), it shows the table.
      */}
      <div className="max-w-7xl mx-auto">
        {/* UPDATED: Ensure overflow-x-auto is here to handle table width issues internally */}
        <div className="overflow-x-auto w-full md:shadow-xl md:rounded-2xl md:bg-white">
          <table className="min-w-full border-collapse text-sm w-full">
            {/* Header: Hidden on mobile, visible on desktop (md) */}
            <thead className="hidden md:table-header-group bg-pink-100 text-pink-900 uppercase">
              <tr>
                <th className="px-6 py-3 text-left font-semibold tracking-wider w-[15%]">Name</th>
                <th className="px-6 py-3 text-left font-semibold tracking-wider w-[20%]">Email</th>
                <th className="px-6 py-3 text-left font-semibold tracking-wider w-[15%]">Phone</th>
                <th className="px-6 py-3 text-left font-semibold tracking-wider w-[30%]">Message</th>
                <th className="px-6 py-3 text-left font-semibold tracking-wider w-[15%]">Received</th>
                <th className="px-6 py-3 text-center font-semibold tracking-wider w-[5%]">Action</th>
              </tr>
            </thead>
            
            <tbody className="block md:table-row-group divide-y divide-gray-200">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr 
                    key={contact._id} 
                    className="block md:table-row bg-white hover:bg-pink-50 transition-colors duration-200 mb-4 md:mb-0 rounded-xl shadow-md md:shadow-none border md:border-0 p-4 md:p-0"
                  >
                    {/* Name */}
                    <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4 whitespace-nowrap font-medium text-gray-900 md:truncate">
                      <span className="md:hidden font-bold text-pink-800 block text-xs uppercase mb-1">Name</span>
                      {contact.name}
                    </td>

                    {/* Email */}
                    <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-gray-600 md:truncate">
                      <span className="md:hidden font-bold text-pink-800 block text-xs uppercase mb-1">Email</span>
                      <a href={`mailto:${contact.email}`} className="hover:text-pink-600 transition-colors break-all">
                        {contact.email}
                      </a>
                    </td>

                    {/* Phone */}
                    <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-gray-600">
                      <span className="md:hidden font-bold text-pink-800 block text-xs uppercase mb-1">Phone</span>
                      {contact.phone || 'N/A'}
                    </td>

                    {/* Message */}
                    <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4 text-gray-700">
                      <span className="md:hidden font-bold text-pink-800 block text-xs uppercase mb-1">Message</span>
                      <div className="max-h-32 md:max-h-24 overflow-y-auto whitespace-pre-wrap break-words bg-gray-50 md:bg-transparent p-2 md:p-0 rounded border md:border-0">
                          {contact.message}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-gray-500">
                      <span className="md:hidden font-bold text-pink-800 block text-xs uppercase mb-1">Received</span>
                      {new Date(contact.createdAt).toLocaleString()}
                    </td>

                    {/* Action */}
                    <td className="block md:table-cell px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-center border-t md:border-0 mt-2 md:mt-0">
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="w-full md:w-auto px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="block md:table-row">
                  <td colSpan={6} className="block md:table-cell text-center py-10 text-gray-500 bg-white md:bg-transparent rounded-xl shadow md:shadow-none">
                    No messages have been received yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactTable;