import React, { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faMessage } from "@fortawesome/free-solid-svg-icons";
import {
    faInstagram,
    faLinkedinIn,
    faFacebook,
}
from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        // Placeholder logic (You can replace this with Formspree, EmailJS, etc.)
        setTimeout(() => {
            setStatus("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        }, 1000);
    };

    return (
        <>
          
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
                integrity="sha512-Ho3pNHR+lwToz7bAbuYh43wBhJcEADbRwBLUP1tzUWyU4oH1Ymc4ZkNeKyE7o8yTCmv2dspOBmUKgx5xO4Ck3w=="
                crossorigin="anonymous"
                referrerpolicy="no-referrer"
            />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 ">
                <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Me</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Message</label>
                            <textarea
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Write your message here..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Send Message
                        </button>
                        {status && <p className="text-center text-sm text-green-600 mt-2">{status}</p>}
                    </form>
                    <footer>
                        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
                            <p>© 2024 AkshayBhiogade. All rights reserved.</p>
 <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                aria-label="Instagram"
                className="hover:text-indigo-600 transition text-xl"
                href="https://www.instagram.com/akshay_bhiogade"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                aria-label="LinkedIn"
                className="hover:text-indigo-600 transition text-xl"
                href="https://www.linkedin.com/in/akshay-bhiogade-a821072bb"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a
                aria-label="Facebook"
                className="hover:text-indigo-600 transition text-xl"
                href="https://www.facebook.com/share/1FaikhHKGu/"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
                        </div>
                    </footer>
                </div>

            </div>
        </>
    );
};

export default Contact;
