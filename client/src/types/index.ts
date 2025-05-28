import { User, FacultyMember, NewsEvent, Course, ResearchProject, CourseMaterial, SupportTicket, Announcement } from '@shared/schema';

// Authentication response type
export interface AuthResponse {
  user: User;
  token: string;
}

// Dashboard stat types
export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalResources: number;
  recentAnnouncements: Announcement[];
}

// Course with materials
export interface CourseWithMaterials extends Course {
  materials?: CourseMaterial[];
}

// Admin dashboard stat types
export interface AdminStats {
  totalUsers: number;
  studentCount: number;
  adminCount: number;
  pendingApprovals: number;
  totalCourses: number;
  totalResearchProjects: number;
  totalNewsEvents: number;
  totalSupportTickets: number;
  openTickets: number;
}

// Support ticket with status
export interface SupportTicketWithStatus extends SupportTicket {
  statusText: 'Open' | 'In Progress' | 'Resolved';
  statusColor: 'warning' | 'primary' | 'success';
}

// Table pagination type
export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

// Form validation error
export interface ValidationError {
  field: string;
  message: string;
}
