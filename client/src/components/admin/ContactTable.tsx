import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/services/api"; // Use the centralized API URL

// Define the type for a contact message to ensure type safety
interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string; // Keep as string for simplicity, formatting will handle it
}

// The component name "ContactTable" now matches the filename
const ContactTable = () => {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token not found. Please log in again.");
        }

        const response = await axios.get(`${API_BASE_URL}/contact/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setContacts(response.data);
      } catch (err: any) {
        console.error("Error fetching contacts:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch messages.");
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-serif font-bold text-gray-800 text-center mb-6">Contact Form Messages</h2>
      
      {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg mb-4 shadow-sm">{error}</p>}

      <div className="overflow-x-auto shadow-xl rounded-2xl bg-white">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-pink-100 text-pink-900 uppercase">
            <tr>
              <th className="px-6 py-3 text-left font-semibold tracking-wider">Name</th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider">Email</th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider">Message</th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-pink-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{contact.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    <a href={`mailto:${contact.email}`} className="hover:text-pink-600 transition-colors">{contact.email}</a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{contact.phone || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-700 min-w-[300px] whitespace-pre-wrap">{contact.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(contact.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  {error ? "Could not load messages." : "No messages have been received yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// The export now correctly matches the component name and the new filename
export default ContactTable;