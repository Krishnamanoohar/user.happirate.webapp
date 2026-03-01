import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
const GetInTouchSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
  const newErrors = {};

  // Name Required
  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
  } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
    newErrors.name = "Name should contain only letters";
  }

  // Mobile Required
  if (!formData.mobile.trim()) {
    newErrors.mobile = "Mobile number is required";
  } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
    newErrors.mobile = "Mobile number must be 10 digits";
  }

  // Email Required
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    newErrors.email = "Enter a valid email address";
  }

  return newErrors;
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
    } else {
      setErrors({});
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  <style>{`
  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    z-index: 0;
    animation: floatOrb 20s ease-in-out infinite;
  }

  .orb-1 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #7c3bed, #a78bfa);
    top: -100px;
    right: -100px;
    animation-delay: 0s;
  }

  .orb-2 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #c4b5fd, #7c3bed);
    bottom: -50px;
    left: -50px;
    animation-delay: -5s;
  }

  @keyframes floatOrb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -30px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
  }
`}</style>
  const inputClass =
    "w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#7c3aed]/30 focus:border-[#7c3aed] outline-none transition-all";
  return (
    <section
      id="contact"
      className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center overflow-hidden bg-gradient-to-br from-white via-[#f8f7ff] to-white"
    >
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
            Get In <span className="text-[#7c3bed]">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent mx-auto rounded-full opacity-50 mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Reach out to us for personalized loan comparisons or partnership inquiries.
            Your financial clarity starts here.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Side: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Contact Information</h3>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-indigo-50 rounded-2xl">
                    <MapPin className="w-6 h-6 text-[#7c3aed]" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-lg">Office Address</h4>
                    <p className="text-slate-500">Hyderabad, Telangana, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="p-3 bg-indigo-50 rounded-2xl">
                    <Phone className="w-6 h-6 text-[#7c3aed]" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-lg">Call Us</h4>
                    <p className="text-slate-500">+91 9346521702</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="p-3 bg-indigo-50 rounded-2xl">
                    <Mail className="w-6 h-6 text-[#7c3aed]" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-lg">Email Us</h4>
                    <a href="mailto:support@happirate.com" className="flex items-center gap-3 text-slate-500">
                      <span className="text-sm">support@happirate.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100">
              <p className="text-slate-900 font-bold text-lg mb-1">Expert Support</p>
              <p className="text-slate-600 text-sm">Our financial advisors typically respond within 24 hours.</p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h3>
              <p className="text-slate-500 mb-8">Have a specific question about your loan? We're here to help.</p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={inputClass}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@mail.com"
                      className={inputClass}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                </div>

                {/* Row 2: Mobile Number and Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <input
                      type="tel"
                      name="mobile"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter 10 digit number"
                      className={inputClass}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Row 3: Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Primary Button */}
                <button
                  type="submit"
                  className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-3 rounded-xl font-bold text-lg transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
                {success && (
                  <p className="text-green-600 font-semibold text-center mt-3">
                    Message sent successfully!
                  </p>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;