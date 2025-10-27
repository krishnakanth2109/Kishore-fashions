import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch data from backend API
    axios.get("http://localhost:5000/api/contact/messages") // replace with your backend URL
      .then((res) => {
        setContacts(res.data)
        console.log(res.data);
      })
      .catch((err) => console.error("Error fetching contacts:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-4">Contact Messages</h2>
      
      <div className="overflow-x-auto shadow-lg rounded-2xl bg-white">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-pink-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-pink-50">
                  <td className="border border-gray-300 px-4 py-2">{contact.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.email1}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No messages found.
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
