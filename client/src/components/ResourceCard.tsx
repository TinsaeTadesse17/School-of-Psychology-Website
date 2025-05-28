import { FileText, Calendar, HelpCircle, Users, School } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: 'book' | 'counseling' | 'research' | 'calendar' | 'organizations' | 'support';
  link: string;
}

export default function ResourceCard({ title, description, icon, link }: ResourceCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'book':
        return <FileText className="text-3xl text-primary" />;
      case 'counseling':
        return <HelpCircle className="text-3xl text-primary" />;
      case 'research':
        return <School className="text-3xl text-primary" />;
      case 'calendar':
        return <Calendar className="text-3xl text-primary" />;
      case 'organizations':
        return <Users className="text-3xl text-primary" />;
      case 'support':
        return <HelpCircle className="text-3xl text-primary" />;
      default:
        return <FileText className="text-3xl text-primary" />;
    }
  };

  return (
    <Card className="bg-gray-50 p-6 rounded-lg shadow-md">
      <CardContent className="p-0">
        <div className="flex items-start mb-4">
          <div className="mr-4">
            {getIcon()}
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-neutral-medium">{description}</p>
          </div>
        </div>
        <a href={link} className="text-primary font-medium hover:underline inline-flex items-center text-sm">
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </CardContent>
    </Card>
  );
}
