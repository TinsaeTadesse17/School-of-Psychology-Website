import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  NewsEvent,
  FacultyMember,
  ResearchProject,
  Course,
  Announcement,
  insertNewsEventSchema,
  insertFacultyMemberSchema,
  insertResearchProjectSchema,
  insertCourseSchema,
  insertAnnouncementSchema
} from '@shared/schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Search,
  Plus,
  RefreshCw,
  Pencil,
  Trash2,
  Calendar,
  Users,
  BookOpen,
  FileText,
  Bell,
  Eye,
  EyeOff,
} from 'lucide-react';
import { formatDistance } from 'date-fns';

// Define form schemas for different content types
const newsEventSchema = insertNewsEventSchema.extend({
  date: z.preprocess(
    (val) => val ? new Date(val as string) : new Date(),
    z.date()
  )
});

const facultyMemberSchema = insertFacultyMemberSchema;
const researchProjectSchema = insertResearchProjectSchema;
const courseSchema = insertCourseSchema;
const announcementSchema = insertAnnouncementSchema.extend({
  expiresAt: z.preprocess(
    (val) => val ? new Date(val as string) : undefined,
    z.date().optional()
  )
});

// Form value types
type NewsEventFormValues = z.infer<typeof newsEventSchema>;
type FacultyMemberFormValues = z.infer<typeof facultyMemberSchema>;
type ResearchProjectFormValues = z.infer<typeof researchProjectSchema>;
type CourseFormValues = z.infer<typeof courseSchema>;
type AnnouncementFormValues = z.infer<typeof announcementSchema>;

// Content type definitions
type ContentType = 'news-events' | 'faculty' | 'research' | 'courses' | 'announcements';

export default function AdminContentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<ContentType>('news-events');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Forms for different content types
  const newsEventForm = useForm<NewsEventFormValues>({
    resolver: zodResolver(newsEventSchema),
    defaultValues: {
      title: '',
      content: '',
      type: 'news',
      date: new Date(),
      imageUrl: '',
      isPublic: true,
    },
  });

  const facultyMemberForm = useForm<FacultyMemberFormValues>({
    resolver: zodResolver(facultyMemberSchema),
    defaultValues: {
      name: '',
      title: '',
      department: 'Psychology',
      specialization: '',
      bio: '',
      imageUrl: '',
      email: '',
      phone: '',
    },
  });

  const researchProjectForm = useForm<ResearchProjectFormValues>({
    resolver: zodResolver(researchProjectSchema),
    defaultValues: {
      title: '',
      description: '',
      principalInvestigator: '',
      researchers: '',
      imageUrl: '',
      isPublic: true,
    },
  });

  const courseForm = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      code: '',
      description: '',
      instructor: '',
      credits: 3,
      imageUrl: '',
      syllabus: '',
      isPublic: false,
    },
  });

  const announcementForm = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      content: '',
      isPublic: true,
      active: true,
      expiresAt: undefined,
    },
  });

  // Queries for different content types
  const { data: newsEvents, isLoading: newsEventsLoading } = useQuery<NewsEvent[]>({
    queryKey: ['/api/admin/news-events'],
  });

  const { data: facultyMembers, isLoading: facultyLoading } = useQuery<FacultyMember[]>({
    queryKey: ['/api/admin/faculty'],
  });

  const { data: researchProjects, isLoading: researchLoading } = useQuery<ResearchProject[]>({
    queryKey: ['/api/admin/research'],
  });

  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ['/api/admin/courses'],
  });

  const { data: announcements, isLoading: announcementsLoading } = useQuery<Announcement[]>({
    queryKey: ['/api/admin/announcements'],
  });

  // Generic create mutation
  const createContent = useMutation({
    mutationFn: async ({ type, data }: { type: ContentType, data: any }) => {
      const response = await apiRequest('POST', `/api/admin/${type}`, data);
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/${variables.type}`] });
      toast({
        title: 'Content created',
        description: 'The new content has been created successfully.',
      });
      setDialogOpen(false);
      resetActiveForm();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create content. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Generic update mutation
  const updateContent = useMutation({
    mutationFn: async ({ type, id, data }: { type: ContentType, id: number, data: any }) => {
      const response = await apiRequest('PATCH', `/api/admin/${type}/${id}`, data);
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/${variables.type}`] });
      toast({
        title: 'Content updated',
        description: 'The content has been updated successfully.',
      });
      setDialogOpen(false);
      setIsEditing(false);
      setSelectedItemId(null);
      resetActiveForm();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update content. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Generic delete mutation
  const deleteContent = useMutation({
    mutationFn: async ({ type, id }: { type: ContentType, id: number }) => {
      const response = await apiRequest('DELETE', `/api/admin/${type}/${id}`, {});
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [`/api/admin/${variables.type}`] });
      toast({
        title: 'Content deleted',
        description: 'The content has been deleted successfully.',
      });
      setDeleteDialogOpen(false);
      setSelectedItemId(null);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete content. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Reset the active form based on content type
  const resetActiveForm = () => {
    switch (activeTab) {
      case 'news-events':
        newsEventForm.reset();
        break;
      case 'faculty':
        facultyMemberForm.reset();
        break;
      case 'research':
        researchProjectForm.reset();
        break;
      case 'courses':
        courseForm.reset();
        break;
      case 'announcements':
        announcementForm.reset();
        break;
    }
  };

  // Generic submit handler
  const handleSubmit = (type: ContentType) => {
    switch (type) {
      case 'news-events':
        return newsEventForm.handleSubmit((data) => {
          const formattedData = {
            ...data,
            date: data.date.toISOString(),
          };
          
          if (isEditing && selectedItemId) {
            updateContent.mutate({ type, id: selectedItemId, data: formattedData });
          } else {
            createContent.mutate({ type, data: formattedData });
          }
        });
      case 'faculty':
        return facultyMemberForm.handleSubmit((data) => {
          if (isEditing && selectedItemId) {
            updateContent.mutate({ type, id: selectedItemId, data });
          } else {
            createContent.mutate({ type, data });
          }
        });
      case 'research':
        return researchProjectForm.handleSubmit((data) => {
          if (isEditing && selectedItemId) {
            updateContent.mutate({ type, id: selectedItemId, data });
          } else {
            createContent.mutate({ type, data });
          }
        });
      case 'courses':
        return courseForm.handleSubmit((data) => {
          if (isEditing && selectedItemId) {
            updateContent.mutate({ type, id: selectedItemId, data });
          } else {
            createContent.mutate({ type, data });
          }
        });
      case 'announcements':
        return announcementForm.handleSubmit((data) => {
          const formattedData = {
            ...data,
            expiresAt: data.expiresAt ? data.expiresAt.toISOString() : undefined,
          };
          
          if (isEditing && selectedItemId) {
            updateContent.mutate({ type, id: selectedItemId, data: formattedData });
          } else {
            createContent.mutate({ type, data: formattedData });
          }
        });
    }
  };

  // Handle edit button click
  const handleEditClick = (type: ContentType, item: any) => {
    setIsEditing(true);
    setSelectedItemId(item.id);
    
    switch (type) {
      case 'news-events':
        newsEventForm.reset({
          ...item,
          date: new Date(item.date),
        });
        break;
      case 'faculty':
        facultyMemberForm.reset(item);
        break;
      case 'research':
        researchProjectForm.reset(item);
        break;
      case 'courses':
        courseForm.reset(item);
        break;
      case 'announcements':
        announcementForm.reset({
          ...item,
          expiresAt: item.expiresAt ? new Date(item.expiresAt) : undefined,
        });
        break;
    }
    
    setDialogOpen(true);
  };

  // Handle delete button click
  const handleDeleteClick = (type: ContentType, id: number) => {
    setActiveTab(type);
    setSelectedItemId(id);
    setDeleteDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (selectedItemId) {
      deleteContent.mutate({ type: activeTab, id: selectedItemId });
    }
  };

  // Handle add new button click
  const handleAddNew = () => {
    setIsEditing(false);
    setSelectedItemId(null);
    resetActiveForm();
    setDialogOpen(true);
  };

  // Filter content based on search term
  const filteredNewsEvents = newsEvents?.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFaculty = facultyMembers?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredResearch = researchProjects?.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.principalInvestigator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCourses = courses?.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAnnouncements = announcements?.filter(item =>
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine if any action is currently in progress
  const isActionInProgress = createContent.isPending || updateContent.isPending || deleteContent.isPending;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Content
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs 
        defaultValue="news-events" 
        className="space-y-4"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ContentType)}
      >
        <TabsList>
          <TabsTrigger value="news-events" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            News & Events
          </TabsTrigger>
          <TabsTrigger value="faculty" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Faculty
          </TabsTrigger>
          <TabsTrigger value="research" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Research
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            Announcements
          </TabsTrigger>
        </TabsList>

        {/* News & Events Tab */}
        <TabsContent value="news-events">
          <Card>
            <CardHeader>
              <CardTitle>News & Events</CardTitle>
              <CardDescription>
                Manage news articles and upcoming events for the department.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {newsEventsLoading ? (
                <div className="py-6 text-center">
                  <RefreshCw className="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Loading content...</p>
                </div>
              ) : filteredNewsEvents && filteredNewsEvents.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Visibility</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNewsEvents.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              item.type === 'event'
                                ? 'bg-primary text-white'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {item.type}
                            </span>
                          </TableCell>
                          <TableCell>
                            {new Date(item.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {item.isPublic ? (
                              <span className="inline-flex items-center text-green-600">
                                <Eye className="h-4 w-4 mr-1" /> Public
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-amber-600">
                                <EyeOff className="h-4 w-4 mr-1" /> Private
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="mr-2"
                              onClick={() => handleEditClick('news-events', item)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteClick('news-events', item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No news or events found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {searchTerm
                      ? "Try adjusting your search criteria"
                      : "Get started by creating a news article or event"}
                  </p>
                  {searchTerm && (
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchTerm('')}
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Faculty Tab */}
        <TabsContent value="faculty">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Members</CardTitle>
              <CardDescription>
                Manage faculty profiles and information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {facultyLoading ? (
                <div className="py-6 text-center">
                  <RefreshCw className="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Loading faculty members...</p>
                </div>
              ) : filteredFaculty && filteredFaculty.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Specialization</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFaculty.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>{item.specialization}</TableCell>
                          <TableCell>{item.email || 'N/A'}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="mr-2"
                              onClick={() => handleEditClick('faculty', item)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteClick('faculty', item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No faculty members found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {searchTerm
                      ? "Try adjusting your search criteria"
                      : "Get started by adding faculty profiles"}
                  </p>
                  {searchTerm && (
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchTerm('')}
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research Tab */}
        <TabsContent value="research">
          <Card>
            <CardHeader>
              <CardTitle>Research Projects</CardTitle>
              <CardDescription>
                Manage research projects and initiatives of the department.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {researchLoading ? (
                <div className="py-6 text-center">
                  <RefreshCw className="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Loading research projects...</p>
                </div>
              ) : filteredResearch && filteredResearch.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project Title</TableHead>
                        <TableHead>Principal Investigator</TableHead>
                        <TableHead>Visibility</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredResearch.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>{item.principalInvestigator}</TableCell>
                          <TableCell>
                            {item.isPublic ? (
                              <span className="inline-flex items-center text-green-600">
                                <Eye className="h-4 w-4 mr-1" /> Public
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-amber-600">
                                <EyeOff className="h-4 w-4 mr-1" /> Private
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="mr-2"
                              onClick={() => handleEditClick('research', item)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteClick('research', item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No research projects found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {searchTerm
                      ? "Try adjusting your search criteria"
                      : "Get started by adding research projects"}
                  </p>
                  {searchTerm && (
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchTerm('')}
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
              <CardDescription>
                Manage courses offered by the psychology department.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {coursesLoading ? (
                <div className="py-6 text-center">
                  <RefreshCw className="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Loading courses...</p>
                </div>
              ) : filteredCourses && filteredCourses.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Title</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Visibility</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCourses.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>{item.code}</TableCell>
                          <TableCell>{item.instructor}</TableCell>
                          <TableCell>{item.credits}</TableCell>
                          <TableCell>
                            {item.isPublic ? (
                              <span className="inline-flex items-center text-green-600">
                                <Eye className="h-4 w-4 mr-1" /> Public
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-amber-600">
                                <EyeOff className="h-4 w-4 mr-1" /> Private
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="mr-2"
                              onClick={() => handleEditClick('courses', item)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteClick('courses', item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <BookOpen className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No courses found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {searchTerm
                      ? "Try adjusting your search criteria"
                      : "Get started by adding courses"}
                  </p>
                  {searchTerm && (
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchTerm('')}
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements">
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>
                Manage announcements that appear on the site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {announcementsLoading ? (
                <div className="py-6 text-center">
                  <RefreshCw className="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Loading announcements...</p>
                </div>
              ) : filteredAnnouncements && filteredAnnouncements.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Content</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Visibility</TableHead>
                        <TableHead>Expires</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAnnouncements.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium max-w-md truncate">
                            {item.content}
                          </TableCell>
                          <TableCell>
                            {item.active ? (
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                                Inactive
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {item.isPublic ? (
                              <span className="inline-flex items-center text-green-600">
                                <Eye className="h-4 w-4 mr-1" /> Public
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-amber-600">
                                <EyeOff className="h-4 w-4 mr-1" /> Private
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {item.expiresAt 
                              ? new Date(item.expiresAt).toLocaleDateString() 
                              : 'Never'}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="mr-2"
                              onClick={() => handleEditClick('announcements', item)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteClick('announcements', item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Bell className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No announcements found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {searchTerm
                      ? "Try adjusting your search criteria"
                      : "Get started by adding announcements"}
                  </p>
                  {searchTerm && (
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchTerm('')}
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Content Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit' : 'Add New'} {activeTab === 'news-events' ? 'News/Event' : 
                activeTab === 'faculty' ? 'Faculty Member' : 
                activeTab === 'research' ? 'Research Project' :
                activeTab === 'courses' ? 'Course' : 'Announcement'}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? `Update the details of this ${activeTab.replace(/-/g, ' ').slice(0, -1)}.`
                : `Create a new ${activeTab.replace(/-/g, ' ').slice(0, -1)} to display on the website.`}
            </DialogDescription>
          </DialogHeader>

          {/* News & Events Form */}
          {activeTab === 'news-events' && (
            <Form {...newsEventForm}>
              <form onSubmit={handleSubmit('news-events')} className="space-y-4">
                <FormField
                  control={newsEventForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={newsEventForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter content" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={newsEventForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="news">News</SelectItem>
                            <SelectItem value="event">Event</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={newsEventForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field}
                            value={field.value ? field.value.toISOString().split('T')[0] : ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={newsEventForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter image URL" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a URL to an image for this content.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={newsEventForm.control}
                  name="isPublic"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Public</FormLabel>
                        <FormDescription>
                          Make this content visible to all website visitors
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setDialogOpen(false)}
                    disabled={isActionInProgress}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isActionInProgress}
                  >
                    {isActionInProgress ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}

          {/* Faculty Form */}
          {activeTab === 'faculty' && (
            <Form {...facultyMemberForm}>
              <form onSubmit={handleSubmit('faculty')} className="space-y-4">
                <FormField
                  control={facultyMemberForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={facultyMemberForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Associate Professor" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={facultyMemberForm.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input placeholder="Department" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={facultyMemberForm.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialization</FormLabel>
                      <FormControl>
                        <Input placeholder="Area of specialization" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={facultyMemberForm.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biography</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Short biography" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={facultyMemberForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={facultyMemberForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={facultyMemberForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="URL to profile image" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a URL to a profile image.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setDialogOpen(false)}
                    disabled={isActionInProgress}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isActionInProgress}
                  >
                    {isActionInProgress ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}

          {/* Research Form */}
          {activeTab === 'research' && (
            <Form {...researchProjectForm}>
              <form onSubmit={handleSubmit('research')} className="space-y-4">
                <FormField
                  control={researchProjectForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={researchProjectForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Project description" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={researchProjectForm.control}
                  name="principalInvestigator"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Principal Investigator</FormLabel>
                      <FormControl>
                        <Input placeholder="Lead researcher name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={researchProjectForm.control}
                  name="researchers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other Researchers</FormLabel>
                      <FormControl>
                        <Input placeholder="Comma-separated names" {...field} />
                      </FormControl>
                      <FormDescription>
                        List other researchers involved, separated by commas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={researchProjectForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="URL to project image" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={researchProjectForm.control}
                  name="isPublic"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Public</FormLabel>
                        <FormDescription>
                          Make this research project visible to all website visitors
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setDialogOpen(false)}
                    disabled={isActionInProgress}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isActionInProgress}
                  >
                    {isActionInProgress ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}

          {/* Courses Form */}
          {activeTab === 'courses' && (
            <Form {...courseForm}>
              <form onSubmit={handleSubmit('courses')} className="space-y-4">
                <FormField
                  control={courseForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Course title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={courseForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Code</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. PSY101" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={courseForm.control}
                    name="credits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Credits</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="3" 
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value))} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={courseForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Course description" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={courseForm.control}
                  name="instructor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor</FormLabel>
                      <FormControl>
                        <Input placeholder="Instructor name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={courseForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="URL to course image" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={courseForm.control}
                  name="syllabus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Syllabus URL</FormLabel>
                      <FormControl>
                        <Input placeholder="URL to syllabus PDF" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a URL to a downloadable syllabus if available.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={courseForm.control}
                  name="isPublic"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Public</FormLabel>
                        <FormDescription>
                          Make this course visible to all website visitors
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setDialogOpen(false)}
                    disabled={isActionInProgress}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isActionInProgress}
                  >
                    {isActionInProgress ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}

          {/* Announcements Form */}
          {activeTab === 'announcements' && (
            <Form {...announcementForm}>
              <form onSubmit={handleSubmit('announcements')} className="space-y-4">
                <FormField
                  control={announcementForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Announcement Text</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter announcement text" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Keep announcements concise and clear.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={announcementForm.control}
                  name="expiresAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiration Date (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field}
                          value={field.value ? field.value.toISOString().split('T')[0] : ''}
                        />
                      </FormControl>
                      <FormDescription>
                        Leave blank if the announcement should not expire.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <FormField
                    control={announcementForm.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Active</FormLabel>
                          <FormDescription>
                            Display this announcement on the website
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={announcementForm.control}
                    name="isPublic"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Public</FormLabel>
                          <FormDescription>
                            Make this announcement visible to all website visitors (unchecked means students only)
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setDialogOpen(false)}
                    disabled={isActionInProgress}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isActionInProgress}
                  >
                    {isActionInProgress ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {activeTab.replace(/-/g, ' ').slice(0, -1)}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isActionInProgress}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isActionInProgress}
            >
              {isActionInProgress ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
