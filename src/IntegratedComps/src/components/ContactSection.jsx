import Navbar from "./Navbar"
import Footer from "./Footer";
import { MapPin, Phone, Mail } from "lucide-react";


export default function ContactPage() {
  return (
    <>
      <Navbar />

      {/* Contact Section */}
     <section id="contact-section" className="min-h-screen !bg-white flex items-center py-24">

        <div className="max-w-7xl mx-auto w-full px-6">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* LEFT SIDE */}
            <div className="text-Black space-y-10 ">

              <h1 className="text-5xl font-bold">
                Get in Touch
              </h1>

              <p className="text-Black text-lg max-w-md leading-relaxed">
                Reach out to us for personalized loan comparisons, partnership
                inquiries, or support. Your financial clarity starts here.
              </p>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <MapPin className="text-purple-600 w-6 h-6" />
                 
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Office Address</h4>
                  <p className="text-black text-sm">
                    INDIA <br />
                    1st & 3rd Floors, Pearl Enclave, Road No.5, Behind TV9, Banjara Hills, Hyderabad – 500034.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Phone className="text-purple-600 w-6 h-6" />
                  
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Call Us</h4>
                  <p className="text-black text-sm">
                    +91 7997597799 <br />
                    
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Mail className="text-purple-600 w-6 h-6" />
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Email Us</h4>
                  <p className="text-black text-sm">
                    support@happirate.com <br />
                    
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex justify-center lg:justify-end">

              <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10">

                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Send Us a Message
                </h3>

                <p className="text-gray-500 mb-6 text-sm">
                  Want to know which loan suits you best? Send us your query and
                  our team will get back with the right guidance.
                </p>

                <form className="space-y-5">

                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full rounded-lg bg-gray-100 border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full rounded-lg bg-gray-100 border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />

                    <input
                      type="tel"
                      placeholder="Your Mobile Number"
                      className="w-full rounded-lg bg-gray-100 border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />

                  </div>

                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full rounded-lg bg-gray-100 border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />

                  <textarea
                    rows={5}
                    placeholder="Message"
                    className="w-full rounded-lg bg-gray-100 border px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-black"
                  />

                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold
hover:bg-purple-700 transition shadow-lg"
                  >
                    Send Message
                  </button>

                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
