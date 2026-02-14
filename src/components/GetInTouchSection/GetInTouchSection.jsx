import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const GetInTouchSection = () => {
  return (
    <section id="contact" className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
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
                    <p className="text-slate-500">support@happirate.com</p>
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

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3.5 text-slate-900 focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3.5 text-slate-900 focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Mobile Number and Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3.5 text-slate-900 focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Subject</label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3.5 text-slate-900 focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Write your message here..."
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3.5 text-slate-900 focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] outline-none resize-none transition-all"
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
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;