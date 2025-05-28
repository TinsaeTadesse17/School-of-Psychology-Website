import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Calendar, 
  HelpCircle, 
  User, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { logout, user } = useAuth();
  const [location] = useLocation();

  const navItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Courses',
      href: '/courses',
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Resources',
      href: '/resources',
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Calendar',
      href: '/calendar',
      icon: <Calendar className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Support',
      href: '/support',
      icon: <HelpCircle className="mr-2 h-4 w-4" />,
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-primary text-white">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <Link href="/">
              <a className="flex items-center">
                <span className="text-xl font-semibold">AAU Psychology</span>
              </a>
            </Link>
          </div>
          
          <div className="px-4 mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs opacity-70">{user?.email}</p>
              </div>
            </div>
          </div>
          
          <Separator className="bg-primary-light mb-6" />
          
          <nav className="flex-1 px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`flex items-center px-4 py-2 text-sm rounded-md ${
                      isActive
                        ? 'bg-primary-dark text-white'
                        : 'text-white hover:bg-primary-light'
                    }`}
                  >
                    {item.icon}
                    {item.title}
                  </a>
                </Link>
              );
            })}
          </nav>
          
          <div className="px-4 py-4 mt-auto">
            <Button 
              variant="outline" 
              className="w-full justify-start text-white border-white hover:bg-primary-dark hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Student Portal</h1>
            <div className="md:hidden">
              {/* Mobile menu button would go here */}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <Card className="p-6 bg-white shadow-sm">
            {children}
          </Card>
        </main>
      </div>
    </div>
  );
}
