import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Megaphone } from 'lucide-react';
import { Announcement } from '@shared/schema';

export default function AnnouncementBar() {
  const { data: announcements } = useQuery<Announcement[]>({
    queryKey: ['/api/announcements/active'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const [text, setText] = useState<string>('');
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (announcements && announcements.length > 0) {
      const announcementText = announcements
        .map(a => a.content)
        .join(' | ');
      setText(announcementText);
    } else {
      setText('Welcome to the Department of Psychology at Addis Ababa University');
    }
  }, [announcements]);
  
  return (
    <section className="bg-primary-dark text-white py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <Megaphone className="h-5 w-5 mr-2" />
          <h3 className="font-heading font-semibold text-lg mr-4 hidden sm:block">Announcements:</h3>
          <div className="overflow-hidden relative flex-1" style={{ height: '28px' }}>
            <div 
              ref={marqueeRef}
              className="whitespace-nowrap absolute animate-marquee"
              style={{
                animationDuration: '30s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            >
              {text}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
