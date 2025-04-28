import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
            Your Dream Gig Starts Here!
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            Find the perfect gig and take your career to the next level. Whether you're a freelancer or a business, we're here to help you succeed.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              className="bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-6 rounded-full text-lg font-semibold"
              href="#services"
            >
              Browse Services
            </a>
            <a
              className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-full text-lg font-semibold"
              href="#contact"
            >
              Contact Us
            </a>
          </div>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto text-center" id="services">
          <h2 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-10">
            Our Premium Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <Image
                src="/images/web-design.jpg"
                alt="Service 1"
                width={400}
                height={250}
                className="rounded-t-lg"
              />
              <h3 className="text-xl font-semibold text-indigo-600 mt-4">
                Custom Web Design
              </h3>
              <p className="mt-2 text-gray-600">
                Get a unique, high-quality website tailored to your business needs.
              </p>
              <a
                href="#"
                className="text-indigo-600 mt-4 inline-block text-lg font-medium"
              >
                Learn More
              </a>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <Image
                src="/images/seo-optimization.png"
                alt="Service 2"
                width={400}
                height={250}
                className="rounded-t-lg"
              />
              <h3 className="text-xl font-semibold text-indigo-600 mt-4">
                SEO Optimization
              </h3>
              <p className="mt-2 text-gray-600">
                Improve your website’s visibility and ranking on search engines.
              </p>
              <a
                href="#"
                className="text-indigo-600 mt-4 inline-block text-lg font-medium"
              >
                Learn More
              </a>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <Image
                src="/images/branding-marketing.png"
                alt="Service 3"
                width={400}
                height={250}
                className="rounded-t-lg"
              />
              <h3 className="text-xl font-semibold text-indigo-600 mt-4">
                Branding & Marketing
              </h3>
              <p className="mt-2 text-gray-600">
                Create a strong brand identity and expand your reach through effective marketing strategies.
              </p>
              <a
                href="#"
                className="text-indigo-600 mt-4 inline-block text-lg font-medium"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12" id="contact">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl font-semibold mb-6">
            Get in Touch with Us
          </h3>
          <p className="mb-8 text-lg">
            Have questions or want to get started? Reach out today and let's work together to create something amazing!
          </p>
          <a
            href="mailto:contact@giglanding.com"
            className="bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-6 rounded-full text-lg font-semibold"
          >
            Send us an Email
          </a>
        </div>
      </footer>
    </div>
  );
}
