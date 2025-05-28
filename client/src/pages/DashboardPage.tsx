import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, BookOpen, FileBadge, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewsEvent, Announcement, Course } from '@shared/schema';
import { formatDistance } from 'date-fns';

export default function DashboardPage() {
  const { user } = useAuth();
  
  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses/student'],
  });
  
  const { data: announcements, isLoading: announcementsLoading } = useQuery<Announcement[]>({
    queryKey: ['/api/announcements/all'],
  });
  
  const { data: events, isLoading: eventsLoading } = useQuery<NewsEvent[]>({
    queryKey: ['/api/news-events/student'],
  });

  const upcomingEvents = events?.filter(event => 
    event.type === 'event' && new Date(event.date) > new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.firstName} {user?.lastName}
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Active courses this semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Events in the next 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Announcements</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcements?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Active announcements
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
            <FileBadge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              Available course materials
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">My Courses</h2>
          
          {coursesLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : courses && courses.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg mb-2">{course.title}</h3>
                    <div className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                      <span className="font-medium text-primary">{course.code}</span> • 
                      <span>Instructor: {course.instructor}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <Link href={`/courses/${course.id}`}>
                      <Button variant="outline" size="sm">View Course</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-medium text-lg mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-4">
                  You are not enrolled in any courses at the moment.
                </p>
                <Link href="/courses">
                  <Button>Browse Available Courses</Button>
                </Link>
              </CardContent>
            </Card>
          )}
          
          <div className="flex justify-end">
            <Link href="/courses">
              <Button variant="outline">View All Courses</Button>
            </Link>
          </div>
        </TabsContent>
        
        <TabsContent value="announcements" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Announcements</h2>
          
          {announcementsLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : announcements && announcements.length > 0 ? (
            <div className="space-y-2">
              {announcements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardContent className="p-4">
                    <p className="mb-2">{announcement.content}</p>
                    <p className="text-xs text-muted-foreground">
                      Posted: {formatDistance(new Date(announcement.createdAt), new Date(), { addSuffix: true })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-medium text-lg mb-2">No announcements</h3>
                <p className="text-muted-foreground">
                  There are no active announcements at this time.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          
          {eventsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : upcomingEvents && upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg mb-1">{event.title}</h3>
                    <p className="text-sm text-primary font-medium mb-2">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {event.content}
                    </p>
                    <Button variant="outline" size="sm">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-medium text-lg mb-2">No upcoming events</h3>
                <p className="text-muted-foreground mb-4">
                  There are no events scheduled in the near future.
                </p>
                <Link href="/news">
                  <Button>View All Events</Button>
                </Link>
              </CardContent>
            </Card>
          )}
          
          <div className="flex justify-end">
            <Link href="/news">
              <Button variant="outline">View All Events</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
