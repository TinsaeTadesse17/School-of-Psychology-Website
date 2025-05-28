import { formatDistance } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NewsEvent } from '@shared/schema';

interface NewsCardProps {
  item: NewsEvent;
}

export default function NewsCard({ item }: NewsCardProps) {
  const isEvent = item.type === 'event';
  const date = new Date(item.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
  const timeAgo = formatDistance(date, new Date(), { addSuffix: true });

  return (
    <Card className="rounded-lg overflow-hidden shadow-md border border-neutral-light hover:shadow-lg transition">
      <div className="h-48 bg-neutral-light">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary-light text-white">
            <span className="text-lg">
              {isEvent ? 'Upcoming Event' : 'Department News'}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex items-center mb-2">
          <Badge className={isEvent ? 'bg-primary' : 'bg-success'}>
            {isEvent ? 'Event' : 'News'}
          </Badge>
          <span className="text-neutral-medium text-sm ml-2" title={formattedDate}>
            {timeAgo}
          </span>
        </div>
        <h3 className="font-heading font-semibold text-xl mb-2">{item.title}</h3>
        <p className="text-neutral-medium mb-4">
          {item.content.length > 120
            ? `${item.content.substring(0, 120)}...`
            : item.content}
        </p>
        <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </CardContent>
    </Card>
  );
}
