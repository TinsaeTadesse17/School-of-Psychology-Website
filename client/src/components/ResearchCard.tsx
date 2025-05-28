import { Card, CardContent } from '@/components/ui/card';
import { ResearchProject } from '@shared/schema';

interface ResearchCardProps {
  research: ResearchProject;
  isCompact?: boolean;
}

export default function ResearchCard({ research, isCompact = false }: ResearchCardProps) {
  if (isCompact) {
    return (
      <Card className="bg-white p-4 rounded border border-neutral-light">
        <CardContent className="p-0">
          <h4 className="font-heading font-semibold mb-2">{research.title}</h4>
          <p className="text-sm text-neutral-medium">
            {research.description.substring(0, 80)}...
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-gray-50 rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
      <div className="w-full md:w-2/5 h-56 md:h-auto bg-neutral-light">
        {research.imageUrl ? (
          <img 
            src={research.imageUrl} 
            alt={research.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary-light text-white">
            <span className="text-2xl">Research</span>
          </div>
        )}
      </div>
      <CardContent className="p-6 flex-1">
        <h3 className="font-heading font-semibold text-xl mb-2">{research.title}</h3>
        <p className="text-sm text-neutral-medium mb-2">
          Principal Investigator: {research.principalInvestigator}
        </p>
        <p className="text-neutral-medium mb-4">{research.description}</p>
        <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
          View research details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </CardContent>
    </Card>
  );
}
