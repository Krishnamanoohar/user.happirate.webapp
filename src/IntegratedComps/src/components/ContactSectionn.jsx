<div className="w-full gradient-bg py-24">
  <div className="container mx-auto px-6">

    {/* MAIN GRID */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

      {/* LEFT SIDE - Get In Touch */}
      <div className="text-white space-y-8">

        <h2 className="text-5xl font-bold">
          Get in Touch
        </h2>

        <p className="text-gray-300 max-w-md leading-relaxed">
          Reach out to us for personalized loan comparisons, partnership
          inquiries, or support. Your financial clarity starts here.
        </p>

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl">
            📍
          </div>

          <div>
            <h4 className="font-semibold text-lg">Office Address</h4>
            <p className="text-gray-400 text-sm">
              12 Finance Street <br />
              San Francisco, CA 94107
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl">
            📞
          </div>

          <div>
            <h4 className="font-semibold text-lg">Call Us</h4>
            <p className="text-gray-400 text-sm">
              +1 (800) 123-4567 <br />
              +1 (800) 765-4321
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl">
            ✉️
          </div>

          <div>
            <h4 className="font-semibold text-lg">Email Us</h4>
            <p className="text-gray-400 text-sm">
              support@loanwise.com <br />
              info@loanwise.com
            </p>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE - Form */}
      <div className="flex justify-center lg:justify-end">

        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">

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
              className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <input
                type="tel"
                placeholder="Your Mobile Number"
                className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <textarea
              rows={5}
              placeholder="Message"
              className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition shadow-lg"
            >
              Send Message
            </button>

          </form>
        </div>
      </div>

    </div>
  </div>
</div>
