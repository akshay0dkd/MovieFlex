import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

            {/* <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
                integrity="sha512-Ho3pNHR+lwToz7bAbuYh43wBhJcEADbRwBLUP1tzUWyU4oH1Ymc4ZkNeKyE7o8yTCmv2dspOBmUKgx5xO4Ck3w=="
                crossorigin="anonymous"
                referrerpolicy="no-referrer"
            /> */}
            <div className="flex justify-center items-center bg-[#0f172a] px-6 md:px-4 md:py-12 min-h-screen">
                <div className="bg-fuchsia-300 p-8 rounded-2xl w-full max-w-xl gshadow-xl">
                    <h2 className="mb-6 font-bold text-gray-800 text-3xl text-center">Contact Me</h2>
                   
                    <form action="mailto:your-akshaybhiogade02@gmail.com" method="post" enctype="text/plain"
                        onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block mb-1 text-gray-600">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-gray-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-gray-600">Message</label>
                            <textarea
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                placeholder="Write your message here..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg w-full text-white transition duration-200"
                        >
                            Send Message
                        </button>
                        {status && <p className="mt-2 text-green-600 text-sm text-center">{status}</p>}
                    </form>
                    <footer>
                        <div className="flex md:flex-row flex-col justify-between items-center mx-auto px-6 py-6 text-gray-600 text-sm container">
                            <p>© 2024 AkshayBhiogade. All rights reserved.</p>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                                <a
                                    aria-label="Instagram"
                                    className="hover:text-indigo-600 text-xl transition"
                                    href="https://www.instagram.com/akshay_bhiogade"
                                >
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                                <a
                                    aria-label="LinkedIn"
                                    className="hover:text-indigo-600 text-xl transition"
                                    href="https://www.linkedin.com/in/akshay-bhiogade-a821072bb"
                                >
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </a>
                                <a
                                    aria-label="Facebook"
                                    className="hover:text-indigo-600 text-xl transition"
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
