import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  Users, 
  FileText,
  Bell,
  Settings,
  HelpCircle, 
  User, 
  LogOut,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { logout, user } = useAuth();
  const [location] = useLocation();

  const navItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Content',
      href: '/admin/content',
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Announcements',
      href: '/admin/announcements',
      icon: <Bell className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Support Tickets',
      href: '/admin/support',
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
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-neutral-dark text-white">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <span className="text-xl font-semibold">Admin Portal</span>
          </div>
          
          <div className="px-4 mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-neutral-medium flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs opacity-70">Administrator</p>
              </div>
            </div>
          </div>
          
          <Separator className="bg-neutral-medium mb-6" />
          
          <nav className="flex-1 px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`flex items-center px-4 py-2 text-sm rounded-md ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-300 hover:bg-neutral-medium hover:text-white'
                    }`}
                  >
                    {item.icon}
                    {item.title}
                  </a>
                </Link>
              );
            })}
          </nav>
          
          <div className="px-4 py-4 mt-auto space-y-2">
            <Link href="/">
              <a className="flex items-center px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-neutral-medium hover:text-white">
                <Home className="mr-2 h-4 w-4" />
                Back to Website
              </a>
            </Link>
            <Button 
              variant="destructive" 
              className="w-full justify-start"
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
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
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
