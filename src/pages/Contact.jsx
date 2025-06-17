import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';

function Contact() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="from-main-txt/80 to-main-txt bg-gradient-to-r py-16 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
            <p className="text-xl text-blue-100">
              We&apos;re here to help and answer any questions you might have
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center"
            >
              <Mail className="text-main-txt mb-4 h-8 w-8" />
              <h3 className="mb-2 text-lg font-semibold">Email Us</h3>
              <p className="text-gray-600">support@eduquest.com</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center"
            >
              <Phone className="text-main-txt mb-4 h-8 w-8" />
              <h3 className="mb-2 text-lg font-semibold">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center"
            >
              <MapPin className="text-main-txt mb-4 h-8 w-8" />
              <h3 className="mb-2 text-lg font-semibold">Visit Us</h3>
              <p className="text-gray-600">123 Education St, Learning City</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center"
            >
              <Clock className="text-main-txt mb-4 h-8 w-8" />
              <h3 className="mb-2 text-lg font-semibold">Working Hours</h3>
              <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Send us a Message
            </h2>
            <form className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-0"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-0"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-0"
                  placeholder="How can we help you?"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-0"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-main-txt hover:bg-main-txt/85 rounded-lg px-8 py-3 font-semibold text-white transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Find Us
            </h2>
            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970718!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1647043087964!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
