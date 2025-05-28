import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Course, CourseMaterial } from '@shared/schema';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { CheckCircle, FileText, Search, Download } from 'lucide-react';
import { Link } from 'wouter';

interface CourseWithMaterials extends Course {
  materials?: CourseMaterial[];
}

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('all');
  
  const { data: coursesResponse, isLoading } = useQuery<{courses: CourseWithMaterials[]}>({
    queryKey: ['/api/courses/public'],
  });

  const courses = coursesResponse?.courses || [];
  
  const filteredCourses = courses?.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSemester = selectedSemester === 'all' || 
                           (course.code && course.code.includes(selectedSemester));
    
    return matchesSearch && matchesSemester;
  });
  
  const activeCourses = filteredCourses?.filter(course => course.code.includes('2025-1'));
  const pastCourses = filteredCourses?.filter(course => !course.code.includes('2025-1'));
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search courses by title, code, or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full md:w-64">
          <Select
            value={selectedSemester}
            onValueChange={setSelectedSemester}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              <SelectItem value="2025-1">Current (Spring 2025)</SelectItem>
              <SelectItem value="2024-2">Fall 2024</SelectItem>
              <SelectItem value="2024-1">Spring 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Courses</TabsTrigger>
          <TabsTrigger value="past">Past Courses</TabsTrigger>
          <TabsTrigger value="materials">Course Materials</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : activeCourses && activeCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>Code: {course.code} | Credits: {course.credits}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Instructor:</span> {course.instructor}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <Link href={`/courses/${course.id}`}>
                      <Button>View Course</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-medium text-lg mb-2">No active courses found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || selectedSemester !== 'all' 
                    ? "Try adjusting your search criteria" 
                    : "You are not enrolled in any active courses"}
                </p>
                {(searchTerm || selectedSemester !== 'all') && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedSemester('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : pastCourses && pastCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pastCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>Code: {course.code} | Credits: {course.credits}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Instructor:</span> {course.instructor}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <Link href={`/courses/${course.id}`}>
                      <Button variant="outline">View Course</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-medium text-lg mb-2">No past courses found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || selectedSemester !== 'all' 
                    ? "Try adjusting your search criteria" 
                    : "You don't have any past courses in your history"}
                </p>
                {(searchTerm || selectedSemester !== 'all') && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedSemester('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="materials" className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[1, 2].map((_, j) => (
                        <div key={j} className="flex items-center">
                          <div className="h-10 w-10 bg-gray-200 rounded mr-4"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                          </div>
                          <div className="h-8 w-8 bg-gray-200 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : courses && courses.length > 0 ? (
            <div className="space-y-6">
              {courses.filter(course => course.materials && course.materials.length > 0).map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.title} ({course.code})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.materials && course.materials.map((material) => (
                        <div key={material.id} className="flex items-center">
                          <div className="bg-primary-light w-10 h-10 rounded flex items-center justify-center mr-4">
                            <FileText className="text-white h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{material.title}</h4>
                            <p className="text-sm text-muted-foreground">{material.type}</p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-5 w-5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-medium text-lg mb-2">No course materials found</h3>
                <p className="text-muted-foreground mb-4">
                  There are no materials available for your courses at this time.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
