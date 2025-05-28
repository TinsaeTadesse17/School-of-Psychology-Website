import { Card, CardContent } from '@/components/ui/card';
import { FacultyMember } from '@shared/schema';

interface FacultyCardProps {
  faculty: FacultyMember;
}

export default function FacultyCard({ faculty }: FacultyCardProps) {
  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="h-64 bg-neutral-light">
        {faculty.imageUrl ? (
          <img 
            src={faculty.imageUrl} 
            alt={faculty.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary-light text-white">
            <span className="text-6xl">{faculty.name.charAt(0)}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-heading font-semibold text-lg mb-1">{faculty.name}</h3>
        <p className="text-sm text-primary mb-2">{faculty.title}</p>
        <p className="text-sm text-neutral-medium mb-3">{faculty.specialization}</p>
        <a href="#" className="text-primary text-sm font-medium hover:underline inline-flex items-center">
          View profile
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </CardContent>
    </Card>
  );
}
