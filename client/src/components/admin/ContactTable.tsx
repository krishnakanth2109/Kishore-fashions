import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

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
        // ✅ FIXED: Removed authToken check - no longer needed
        const response = await axios.get(`${API_BASE_URL}/contact/messages`);
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
      await axios.delete(`${API_BASE_URL}/contact/messages/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
    } catch (err: any) {
      console.error("Error deleting message:", err);
      setError("Failed to delete message");
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="text-center py-10">
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-serif font-bold text-gray-800 text-center mb-6">Contact Form Messages</h2>
      
      {error && (
        <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg mb-4 shadow-sm">{error}</p>
      )}

      <div className="overflow-x-auto shadow-xl rounded-2xl bg-white">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-pink-100 text-pink-900 uppercase">
            <tr>
              <th className="px-6 py-3 text-left font-semibold tracking-wider">Name</th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider">Email</th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider">Message</th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider">Received</th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-pink-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{contact.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    <a href={`mailto:${contact.email}`} className="hover:text-pink-600 transition-colors">
                      {contact.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{contact.phone || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-700 min-w-[300px] whitespace-pre-wrap max-w-md truncate">
                    {contact.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(contact.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  No messages have been received yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;