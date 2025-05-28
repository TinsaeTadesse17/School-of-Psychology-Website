import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { 
  Users, 
  BookOpen, 
  FileText, 
  AlertCircle, 
  TrendingUp,
  Bell,
  Check,
  Clock,
  XCircle 
} from 'lucide-react';
import { AdminStats, SupportTicketWithStatus } from '@/types';
import { SupportTicket } from '@shared/schema';
import { formatDistance } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function AdminDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ['/api/admin/stats'],
  });
  
  const { data: tickets, isLoading: ticketsLoading } = useQuery<SupportTicket[]>({
    queryKey: ['/api/admin/support-tickets'],
  });
  
  const getStatusColor = (status: string): 'warning' | 'primary' | 'success' => {
    switch (status) {
      case 'open':
        return 'warning';
      case 'in-progress':
        return 'primary';
      case 'resolved':
        return 'success';
      default:
        return 'warning';
    }
  };
  
  const getStatusText = (status: string): 'Open' | 'In Progress' | 'Resolved' => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'in-progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      default:
        return 'Open';
    }
  };
  
  const recentTickets: SupportTicketWithStatus[] = tickets 
    ? tickets
        .filter(t => t.status !== 'resolved')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map(ticket => ({
          ...ticket,
          statusText: getStatusText(ticket.status),
          statusColor: getStatusColor(ticket.status)
        }))
    : [];
  
  const chartData = [
    { name: 'Students', count: stats?.studentCount || 0 },
    { name: 'Admins', count: stats?.adminCount || 0 },
    { name: 'Courses', count: stats?.totalCourses || 0 },
    { name: 'News/Events', count: stats?.totalNewsEvents || 0 },
    { name: 'Research', count: stats?.totalResearchProjects || 0 }
  ];
  
  const ticketData = [
    { name: 'Open', count: stats?.openTickets || 0 },
    { name: 'Resolved', count: (stats?.totalSupportTickets || 0) - (stats?.openTickets || 0) }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.pendingApprovals || 0} pending approvals
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalCourses || 0}</div>
            <p className="text-xs text-muted-foreground">
              Across all programs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Items</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalNewsEvents || 0}</div>
            <p className="text-xs text-muted-foreground">
              News and events published
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.openTickets || 0}</div>
            <p className="text-xs text-muted-foreground">
              Open tickets requiring attention
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Site Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#005baa" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <span className="relative flex h-3 w-3 mr-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">New user registration</p>
                      <p className="text-sm text-muted-foreground">
                        A new student registered (waiting approval)
                      </p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">
                      Just now
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="relative flex h-3 w-3 mr-3">
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Course material added</p>
                      <p className="text-sm text-muted-foreground">
                        New lecture slides for PSY301 uploaded
                      </p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">
                      2 hours ago
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="relative flex h-3 w-3 mr-3">
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Announcement posted</p>
                      <p className="text-sm text-muted-foreground">
                        New departmental announcement published
                      </p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">
                      1 day ago
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="relative flex h-3 w-3 mr-3">
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Event created</p>
                      <p className="text-sm text-muted-foreground">
                        Research Symposium event scheduled for June 15
                      </p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">
                      2 days ago
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/admin/users/add">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="mr-2 h-4 w-4" /> Add New User
                    </Button>
                  </Link>
                  <Link href="/admin/content/add">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="mr-2 h-4 w-4" /> Create Content
                    </Button>
                  </Link>
                  <Link href="/admin/announcements/add">
                    <Button className="w-full justify-start" variant="outline">
                      <Bell className="mr-2 h-4 w-4" /> Post Announcement
                    </Button>
                  </Link>
                  <Link href="/admin/users/approve">
                    <Button className="w-full justify-start" variant="outline">
                      <Check className="mr-2 h-4 w-4" /> Approve Registrations
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Ticket Status</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ticketData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#005baa" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-1 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Database</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Operational</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">API Services</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Operational</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Authentication</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Operational</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Storage</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Operational</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Last checked</span>
                      <span className="text-xs text-muted-foreground">Just now</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              {ticketsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="p-4 border rounded-md animate-pulse">
                      <div className="flex justify-between items-center mb-2">
                        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-5 bg-gray-200 rounded w-20"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              ) : recentTickets.length > 0 ? (
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{ticket.subject}</h3>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          ticket.statusColor === 'warning' 
                            ? 'bg-amber-100 text-amber-800' 
                            : ticket.statusColor === 'primary'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {ticket.statusText}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {ticket.message}
                      </p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>From: {ticket.name} ({ticket.email})</span>
                        <span>{formatDistance(new Date(ticket.createdAt), new Date(), { addSuffix: true })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4">
                  <h3 className="font-medium text-lg mb-2">No open tickets</h3>
                  <p className="text-muted-foreground">All support tickets have been resolved.</p>
                </div>
              )}
              
              <div className="mt-6 flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> Mark In Progress
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 text-green-700">
                    <Check className="h-4 w-4" /> Resolve
                  </Button>
                </div>
                <Link href="/admin/support">
                  <Button>View All Tickets</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Admission', count: 12 },
                      { name: 'Program', count: 8 },
                      { name: 'Research', count: 5 },
                      { name: 'Event', count: 3 },
                      { name: 'Other', count: 7 }
                    ]}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#005baa" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Common Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="mr-2 mt-0.5 text-lg">1.</div>
                      <div>
                        <h4 className="font-medium">Account Access Issues</h4>
                        <p className="text-sm text-muted-foreground">Login problems, password resets, account verification</p>
                      </div>
                    </div>
                    <div className="text-lg font-medium">35%</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="mr-2 mt-0.5 text-lg">2.</div>
                      <div>
                        <h4 className="font-medium">Course Material Access</h4>
                        <p className="text-sm text-muted-foreground">Missing files, download issues, permissions</p>
                      </div>
                    </div>
                    <div className="text-lg font-medium">25%</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="mr-2 mt-0.5 text-lg">3.</div>
                      <div>
                        <h4 className="font-medium">Program Information</h4>
                        <p className="text-sm text-muted-foreground">Admission requirements, course schedules, deadlines</p>
                      </div>
                    </div>
                    <div className="text-lg font-medium">20%</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="mr-2 mt-0.5 text-lg">4.</div>
                      <div>
                        <h4 className="font-medium">Technical Problems</h4>
                        <p className="text-sm text-muted-foreground">Website errors, broken links, form submission issues</p>
                      </div>
                    </div>
                    <div className="text-lg font-medium">15%</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="mr-2 mt-0.5 text-lg">5.</div>
                      <div>
                        <h4 className="font-medium">Other Inquiries</h4>
                        <p className="text-sm text-muted-foreground">Miscellaneous questions and requests</p>
                      </div>
                    </div>
                    <div className="text-lg font-medium">5%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Jan', students: 120, admins: 8 },
                    { name: 'Feb', students: 132, admins: 8 },
                    { name: 'Mar', students: 145, admins: 9 },
                    { name: 'Apr', students: 150, admins: 9 },
                    { name: 'May', students: 180, admins: 10 },
                    { name: 'Jun', students: 210, admins: 12 }
                  ]}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#005baa" name="Students" />
                  <Bar dataKey="admins" fill="#336699" name="Admins" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
                      <span className="text-sm">Direct</span>
                    </div>
                    <span className="font-medium">45%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-400 mr-2"></div>
                      <span className="text-sm">Search</span>
                    </div>
                    <span className="font-medium">30%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-300 mr-2"></div>
                      <span className="text-sm">Referral</span>
                    </div>
                    <span className="font-medium">15%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-200 mr-2"></div>
                      <span className="text-sm">Social</span>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Popular Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h4 className="font-medium">Homepage</h4>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">Views</span>
                      <span className="text-sm font-medium">1,245</span>
                    </div>
                  </div>
                  
                  <div className="border-b pb-2">
                    <h4 className="font-medium">Faculty Page</h4>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">Views</span>
                      <span className="text-sm font-medium">876</span>
                    </div>
                  </div>
                  
                  <div className="border-b pb-2">
                    <h4 className="font-medium">Research</h4>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">Views</span>
                      <span className="text-sm font-medium">654</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Programs</h4>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">Views</span>
                      <span className="text-sm font-medium">542</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-1 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg. Session Duration</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">4m 32s</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pages per Session</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">3.5</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bounce Rate</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">42%</span>
                      <XCircle className="h-4 w-4 text-red-500" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Returning Visitors</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">58%</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
