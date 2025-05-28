import { Link } from 'wouter';
import { Facebook, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-heading font-semibold text-xl mb-4">About Us</h3>
            <p className="text-blue-100 mb-4">
              The Department of Psychology at Addis Ababa University is committed to excellence in research, 
              education, and community service in the field of psychology.
            </p>
            <Link href="/about">
              <span className="text-white hover:text-blue-200 transition inline-flex items-center cursor-pointer">
                Learn more about us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-100">
              <li><Link href="/academics"><span className="hover:text-white transition cursor-pointer">Programs & Courses</span></Link></li>
              <li><Link href="/research"><span className="hover:text-white transition cursor-pointer">Research Centers</span></Link></li>
              <li><Link href="/faculty"><span className="hover:text-white transition cursor-pointer">Faculty & Staff</span></Link></li>
              <li><Link href="/dashboard"><span className="hover:text-white transition cursor-pointer">Current Students</span></Link></li>
              <li><Link href="/admissions"><span className="hover:text-white transition cursor-pointer">Prospective Students</span></Link></li>
              <li><Link href="/news"><span className="hover:text-white transition cursor-pointer">Events & News</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-xl mb-4">Resources</h3>
            <ul className="space-y-2 text-blue-100">
              <li><Link href="/calendar"><span className="hover:text-white transition cursor-pointer">Academic Calendar</span></Link></li>
              <li><Link href="/resources"><span className="hover:text-white transition cursor-pointer">Library Resources</span></Link></li>
              <li><Link href="/resources"><span className="hover:text-white transition cursor-pointer">Student Handbook</span></Link></li>
              <li><Link href="/services"><span className="hover:text-white transition cursor-pointer">Counseling Services</span></Link></li>
              <li><Link href="/career"><span className="hover:text-white transition cursor-pointer">Career Development</span></Link></li>
              <li><Link href="/ethics"><span className="hover:text-white transition cursor-pointer">Research Ethics</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-xl mb-4">Contact</h3>
            <address className="not-italic text-blue-100 space-y-2 mb-4">
              <p>Department of Psychology<br />Addis Ababa University</p>
              <p>P.O. Box 1176<br />Addis Ababa, Ethiopia</p>
              <p>Phone: +251-111-232050<br />Email: psychology@aau.edu.et</p>
            </address>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/AAUOfficial/">
                <span className="text-white hover:text-blue-200 transition cursor-pointer">
                  <Facebook className="h-5 w-5" />
                </span>
              </Link>
              <Link href="https://www.aau.edu.et/">
                <span className="text-white hover:text-blue-200 transition cursor-pointer">
                  <Globe className="h-5 w-5" />
                </span>
              </Link>
              <a href="mailto:psychology@aau.edu.et" className="text-white hover:text-blue-200 transition">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Addis Ababa University - Department of Psychology. All Rights Reserved.</p>
            <div className="flex space-x-4 text-sm text-blue-100">
              <Link href="/about"><span className="hover:text-white transition cursor-pointer">Privacy Policy</span></Link>
              <Link href="/about"><span className="hover:text-white transition cursor-pointer">Terms of Use</span></Link>
              <Link href="/"><span className="hover:text-white transition cursor-pointer">Sitemap</span></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
