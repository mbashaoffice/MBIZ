"use client";
import { Button } from "@/components/ui/button"; // Adjust this import based on your project structure

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-8 sm:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          We are a passionate team of developers, designers, and problem-solvers, dedicated to building impactful and innovative web solutions. 
          With years of combined experience, we specialize in creating dynamic websites, applications, and digital experiences that drive success for businesses and individuals.
        </p>
        
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Who We Are</h2>
            <p className="text-base text-gray-600">
              We are a team of passionate individuals who thrive on collaboration, problem-solving, and bringing innovative ideas to life. 
              Our collective expertise spans across frontend, backend, and design, and we are always excited to learn and explore new technologies.
            </p>
            <img 
              src="/images/our-team.jpg" 
              alt="Our team working together"
              className="w-full h-auto mt-4 rounded-lg shadow-lg"
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Our Mission</h2>
            <p className="text-base text-gray-600">
              Our mission is to empower businesses by crafting responsive, user-friendly, and performance-driven digital experiences. 
              We work closely with our clients to understand their vision and deliver solutions that exceed expectations.
            </p>
            <img 
              src="/images/team-discussion.png" 
              alt="Team discussing project"
              className="w-full h-auto mt-4 rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Our Expertise</h2>
            <ul className="text-base text-gray-600 space-y-2">
              <li>Frontend Development: React, Next.js, Tailwind CSS</li>
              <li>Backend Development: Node.js, Express, Firebase</li>
              <li>Database Management: Firebase, PostgreSQL</li>
              <li>Version Control: Git, GitHub</li>
              <li>Responsive Web Design & UI/UX</li>
            </ul>
            <img 
              src="/images/team-brainstorming.png" 
              alt="Team brainstorming"
              className="w-full h-auto mt-4 rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mt-12">
          <Button
            variant="link"
            onClick={() => window.location.href = '/contact'} // Redirect to contact page
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
