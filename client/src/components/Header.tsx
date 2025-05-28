import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@shared/schema';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onLoginClick: () => void;
}

export default function Header({ onLoginClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => location === path;
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Academics', path: '/academics' },
    { title: 'Research', path: '/research' },
    { title: 'Faculty', path: '/faculty' },
    { title: 'Students', path: '/students' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-primary text-white">
      {/* Top navigation bar */}
      <div className="container mx-auto px-4 py-1 flex justify-between items-center text-xs">
        <div className="flex items-center space-x-4">
          <a href="https://www.aau.edu.et/" target="_blank" rel="noopener noreferrer" className="hover:underline">AAU Home</a>
          <Link href="/resources">
            <span className="hover:underline cursor-pointer">Library</span>
          </Link>
          <Link href="/courses">
            <span className="hover:underline cursor-pointer">E-Learning</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/contact">
            <span className="hover:underline cursor-pointer">Contact</span>
          </Link>
          
          {user ? (
            <Link href={user.role === UserRole.ADMIN ? '/admin' : '/dashboard'}>
              <span className="hover:underline cursor-pointer">
                {user.role === UserRole.ADMIN ? 'Admin Portal' : 'Student Portal'}
              </span>
            </Link>
          ) : (
            <Link href="/dashboard">
              <span className="hover:underline cursor-pointer">Staff Portal</span>
            </Link>
          )}
          
          {user ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white text-primary hover:bg-gray-100 border-none"
              onClick={() => {}}
            >
              {user.firstName}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white text-primary hover:bg-gray-100 border-none"
              onClick={onLoginClick}
            >
              Login
            </Button>
          )}
        </div>
      </div>
      
      {/* Main header with logo and navigation */}
      <div className="border-t border-blue-400">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Link href="/">
              <div className="flex items-center space-x-4 cursor-pointer">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                >
                  <circle cx="100" cy="100" r="90" fill="#FFFFFF" />
                  <path
                    d="M100 10C50 10 10 50 10 100C10 150 50 190 100 190C150 190 190 150 190 100C190 50 150 10 100 10ZM100 170C61.5 170 30 138.5 30 100C30 61.5 61.5 30 100 30C138.5 30 170 61.5 170 100C170 138.5 138.5 170 100 170Z"
                    fill="#005BAA"
                  />
                  <path
                    d="M100 50C80 50 65 65 65 85C65 95 70 105 80 110L65 150H135L120 110C130 105 135 95 135 85C135 65 120 50 100 50ZM100 90C95 90 90 85 90 80C90 75 95 70 100 70C105 70 110 75 110 80C110 85 105 90 100 90Z"
                    fill="#005BAA"
                  />
                </svg>
                <div>
                  <h1 className="font-heading font-bold text-xl md:text-2xl">Department of Psychology</h1>
                  <p className="text-sm text-blue-100">Addis Ababa University</p>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-dark"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          <nav className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto`}>
            <ul className="flex flex-col md:flex-row justify-center md:justify-end space-y-2 md:space-y-0 md:space-x-1 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span 
                      className={`block px-3 py-2 ${isActive(link.path) ? 'bg-primary-dark' : 'hover:bg-primary-dark'} rounded transition cursor-pointer`}
                      onClick={closeMobileMenu}
                    >
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
