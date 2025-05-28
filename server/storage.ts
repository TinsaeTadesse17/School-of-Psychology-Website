import { 
  users, type User, type InsertUser,
  newsEvents, type NewsEvent, type InsertNewsEvent,
  facultyMembers, type FacultyMember, type InsertFacultyMember,
  researchProjects, type ResearchProject, type InsertResearchProject,
  courses, type Course, type InsertCourse,
  courseMaterials, type CourseMaterial, type InsertCourseMaterial,
  supportTickets, type SupportTicket, type InsertSupportTicket,
  announcements, type Announcement, type InsertAnnouncement,
  UserRole
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or, lte, gte, desc, isNull } from "drizzle-orm";

// Storage interface with all CRUD methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  getAllUsers(): Promise<User[]>;

  // News & Events methods
  getNewsEvent(id: number): Promise<NewsEvent | undefined>;
  getPublicNewsEvents(): Promise<NewsEvent[]>;
  getAllNewsEvents(): Promise<NewsEvent[]>;
  createNewsEvent(newsEvent: InsertNewsEvent): Promise<NewsEvent>;
  updateNewsEvent(id: number, newsEvent: Partial<NewsEvent>): Promise<NewsEvent | undefined>;
  deleteNewsEvent(id: number): Promise<boolean>;

  // Faculty methods
  getFacultyMember(id: number): Promise<FacultyMember | undefined>;
  getPublicFacultyMembers(): Promise<FacultyMember[]>;
  getAllFacultyMembers(): Promise<FacultyMember[]>;
  createFacultyMember(faculty: InsertFacultyMember): Promise<FacultyMember>;
  updateFacultyMember(id: number, faculty: Partial<FacultyMember>): Promise<FacultyMember | undefined>;
  deleteFacultyMember(id: number): Promise<boolean>;

  // Research methods
  getResearchProject(id: number): Promise<ResearchProject | undefined>;
  getPublicResearchProjects(): Promise<ResearchProject[]>;
  getAllResearchProjects(): Promise<ResearchProject[]>;
  createResearchProject(research: InsertResearchProject): Promise<ResearchProject>;
  updateResearchProject(id: number, research: Partial<ResearchProject>): Promise<ResearchProject | undefined>;
  deleteResearchProject(id: number): Promise<boolean>;

  // Course methods
  getCourse(id: number): Promise<Course | undefined>;
  getPublicCourses(): Promise<Course[]>;
  getAllCourses(): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, course: Partial<Course>): Promise<Course | undefined>;
  deleteCourse(id: number): Promise<boolean>;

  // Course Material methods
  getCourseMaterial(id: number): Promise<CourseMaterial | undefined>;
  getCourseMaterialsByCourse(courseId: number): Promise<CourseMaterial[]>;
  getAllCourseMaterials(): Promise<CourseMaterial[]>;
  createCourseMaterial(material: InsertCourseMaterial): Promise<CourseMaterial>;
  updateCourseMaterial(id: number, material: Partial<CourseMaterial>): Promise<CourseMaterial | undefined>;
  deleteCourseMaterial(id: number): Promise<boolean>;

  // Support Ticket methods
  getSupportTicket(id: number): Promise<SupportTicket | undefined>;
  getAllSupportTickets(): Promise<SupportTicket[]>;
  getOpenSupportTickets(): Promise<SupportTicket[]>;
  createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket>;
  updateSupportTicket(id: number, ticket: Partial<SupportTicket>): Promise<SupportTicket | undefined>;
  deleteSupportTicket(id: number): Promise<boolean>;

  // Announcement methods
  getAnnouncement(id: number): Promise<Announcement | undefined>;
  getActiveAnnouncements(): Promise<Announcement[]>;
  getPublicActiveAnnouncements(): Promise<Announcement[]>;
  getAllAnnouncements(): Promise<Announcement[]>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  updateAnnouncement(id: number, announcement: Partial<Announcement>): Promise<Announcement | undefined>;
  deleteAnnouncement(id: number): Promise<boolean>;

  // Stats
  getAdminStats(): Promise<{
    totalUsers: number;
    studentCount: number;
    adminCount: number;
    pendingApprovals: number;
    totalCourses: number;
    totalResearchProjects: number;
    totalNewsEvents: number;
    totalSupportTickets: number;
    openTickets: number;
  }>;
}

export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private newsEventsMap: Map<number, NewsEvent>;
  private facultyMembersMap: Map<number, FacultyMember>;
  private researchProjectsMap: Map<number, ResearchProject>;
  private coursesMap: Map<number, Course>;
  private courseMaterialsMap: Map<number, CourseMaterial>;
  private supportTicketsMap: Map<number, SupportTicket>;
  private announcementsMap: Map<number, Announcement>;

  private userIdCounter: number;
  private newsEventIdCounter: number;
  private facultyMemberIdCounter: number;
  private researchProjectIdCounter: number;
  private courseIdCounter: number;
  private courseMaterialIdCounter: number;
  private supportTicketIdCounter: number;
  private announcementIdCounter: number;

  constructor() {
    // Initialize maps
    this.usersMap = new Map();
    this.newsEventsMap = new Map();
    this.facultyMembersMap = new Map();
    this.researchProjectsMap = new Map();
    this.coursesMap = new Map();
    this.courseMaterialsMap = new Map();
    this.supportTicketsMap = new Map();
    this.announcementsMap = new Map();

    // Initialize ID counters
    this.userIdCounter = 1;
    this.newsEventIdCounter = 1;
    this.facultyMemberIdCounter = 1;
    this.researchProjectIdCounter = 1;
    this.courseIdCounter = 1;
    this.courseMaterialIdCounter = 1;
    this.supportTicketIdCounter = 1;
    this.announcementIdCounter = 1;

    // Add initial admin user
    this.createUser({
      email: "admin@aau.edu.et",
      password: "$2b$10$8DxhWg5QGZWMj/Yt1tGDd.UGu9u2xtpA5eI0F6YLuHqvwxP3nxvQq", // "admin123"
      firstName: "Admin",
      lastName: "User",
      role: UserRole.ADMIN,
      verified: true,
      createdAt: new Date()
    });

    // Add some initial data
    this.seedDemoData();
  }

  // Seed some demo data for development
  private seedDemoData() {
    // Create demo students
    this.createUser({
      email: "student@aau.edu.et",
      password: "$2b$10$8DxhWg5QGZWMj/Yt1tGDd.UGu9u2xtpA5eI0F6YLuHqvwxP3nxvQq", // "student123"
      firstName: "Demo",
      lastName: "Student",
      role: UserRole.STUDENT,
      verified: true,
      createdAt: new Date()
    });

    // Create sample news/events
    this.createNewsEvent({
      title: "Annual Psychology Research Symposium",
      content: "Join us for presentations of groundbreaking research from our faculty and graduate students in various psychology domains.",
      type: "event",
      date: new Date("2025-06-15"),
      imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      isPublic: true,
      createdAt: new Date()
    });

    this.createNewsEvent({
      title: "Department Welcomes New Faculty Member",
      content: "Dr. Sarah Teklu joins our faculty, bringing expertise in developmental psychology and cognitive development research.",
      type: "news",
      date: new Date("2025-05-05"),
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      isPublic: true,
      createdAt: new Date()
    });

    // Create sample faculty members
    this.createFacultyMember({
      name: "Dr. Sarah Bekele",
      title: "Associate Professor",
      department: "Psychology",
      specialization: "Clinical Psychology",
      bio: "Specializes in trauma-focused therapies and mental health interventions.",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      email: "sarah.bekele@aau.edu.et",
      phone: "+251-111-232050",
      createdAt: new Date()
    });

    this.createFacultyMember({
      name: "Dr. Daniel Abebe",
      title: "Professor",
      department: "Psychology",
      specialization: "Cognitive Psychology",
      bio: "Research focuses on perception, attention, and memory processes.",
      imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      email: "daniel.abebe@aau.edu.et",
      phone: "+251-111-232051",
      createdAt: new Date()
    });

    // Create sample research projects
    this.createResearchProject({
      title: "Cognitive Development in Ethiopian Children",
      description: "This longitudinal study examines cognitive development patterns in Ethiopian children from diverse socioeconomic backgrounds, exploring cultural and environmental influences on cognitive processes.",
      principalInvestigator: "Dr. Abebe Bekele",
      researchers: "Dr. Meron Tadesse, Dr. Solomon Girma",
      imageUrl: "https://pixabay.com/get/g1279cfc99e7db522975df138bc40ca5072c850a98c7899d292aba70e58d4cf4933d20397f31bc98c301c819ce4f85dcc96c44d91d82917e421b03a583fb94089_1280.jpg",
      isPublic: true,
      createdAt: new Date()
    });

    this.createResearchProject({
      title: "Mental Health Interventions in Rural Communities",
      description: "This project develops and evaluates culturally-adapted mental health interventions for rural Ethiopian communities with limited access to psychological services.",
      principalInvestigator: "Dr. Meron Tadesse",
      researchers: "Dr. Sarah Bekele, Dr. Yonas Tadesse",
      imageUrl: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      isPublic: true,
      createdAt: new Date()
    });

    // Create sample courses
    this.createCourse({
      title: "Introduction to Psychology",
      code: "PSY101-2025-1",
      description: "A comprehensive introduction to the fundamental principles of psychology, including historical perspectives, research methods, and major theoretical frameworks.",
      instructor: "Dr. Sarah Bekele",
      credits: 3,
      imageUrl: "",
      syllabus: "",
      isPublic: true,
      createdAt: new Date()
    });

    this.createCourse({
      title: "Cognitive Psychology",
      code: "PSY245-2025-1",
      description: "Study of mental processes such as attention, language use, memory, perception, problem solving, creativity, and reasoning.",
      instructor: "Dr. Daniel Abebe",
      credits: 4,
      imageUrl: "",
      syllabus: "",
      isPublic: true,
      createdAt: new Date()
    });

    // Create sample course materials
    this.createCourseMaterial({
      courseId: 1,
      title: "Week 1: Introduction to Psychological Science",
      description: "Lecture slides covering the definition of psychology, historical perspectives, and major subfields.",
      fileUrl: "https://example.com/materials/psy101/week1.pdf",
      type: "lecture",
      createdAt: new Date()
    });

    this.createCourseMaterial({
      courseId: 1,
      title: "Assignment 1: Research Methods",
      description: "Research methods assignment due at the end of week 3.",
      fileUrl: "https://example.com/materials/psy101/assignment1.pdf",
      type: "assignment",
      createdAt: new Date()
    });

    // Create sample announcements
    this.createAnnouncement({
      content: "Fall 2025 Registration Now Open | Research Symposium: June 15, 2025 | New Course: Cognitive Neuroscience | Faculty Position Available: Clinical Psychology",
      isPublic: true,
      active: true,
      createdAt: new Date(),
      expiresAt: new Date("2025-08-01")
    });

    // Create sample support tickets
    this.createSupportTicket({
      name: "John Doe",
      email: "john.doe@example.com",
      subject: "admission",
      message: "I would like to get more information about admission requirements for the Psychology program.",
      status: "open",
      createdAt: new Date(),
      resolvedAt: undefined
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...userData, id };
    this.usersMap.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const existingUser = this.usersMap.get(id);
    if (!existingUser) return undefined;

    const updatedUser = { ...existingUser, ...userData };
    this.usersMap.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.usersMap.delete(id);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.usersMap.values());
  }

  // News & Events methods
  async getNewsEvent(id: number): Promise<NewsEvent | undefined> {
    return this.newsEventsMap.get(id);
  }

  async getPublicNewsEvents(): Promise<NewsEvent[]> {
    return Array.from(this.newsEventsMap.values())
      .filter((item) => item.isPublic)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getAllNewsEvents(): Promise<NewsEvent[]> {
    return Array.from(this.newsEventsMap.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async createNewsEvent(newsEventData: InsertNewsEvent): Promise<NewsEvent> {
    const id = this.newsEventIdCounter++;
    const newsEvent: NewsEvent = { ...newsEventData, id };
    this.newsEventsMap.set(id, newsEvent);
    return newsEvent;
  }

  async updateNewsEvent(id: number, newsEventData: Partial<NewsEvent>): Promise<NewsEvent | undefined> {
    const existingNewsEvent = this.newsEventsMap.get(id);
    if (!existingNewsEvent) return undefined;

    const updatedNewsEvent = { ...existingNewsEvent, ...newsEventData };
    this.newsEventsMap.set(id, updatedNewsEvent);
    return updatedNewsEvent;
  }

  async deleteNewsEvent(id: number): Promise<boolean> {
    return this.newsEventsMap.delete(id);
  }

  // Faculty methods
  async getFacultyMember(id: number): Promise<FacultyMember | undefined> {
    return this.facultyMembersMap.get(id);
  }

  async getPublicFacultyMembers(): Promise<FacultyMember[]> {
    return Array.from(this.facultyMembersMap.values());
  }

  async getAllFacultyMembers(): Promise<FacultyMember[]> {
    return Array.from(this.facultyMembersMap.values());
  }

  async createFacultyMember(facultyData: InsertFacultyMember): Promise<FacultyMember> {
    const id = this.facultyMemberIdCounter++;
    const facultyMember: FacultyMember = { ...facultyData, id };
    this.facultyMembersMap.set(id, facultyMember);
    return facultyMember;
  }

  async updateFacultyMember(id: number, facultyData: Partial<FacultyMember>): Promise<FacultyMember | undefined> {
    const existingFaculty = this.facultyMembersMap.get(id);
    if (!existingFaculty) return undefined;

    const updatedFaculty = { ...existingFaculty, ...facultyData };
    this.facultyMembersMap.set(id, updatedFaculty);
    return updatedFaculty;
  }

  async deleteFacultyMember(id: number): Promise<boolean> {
    return this.facultyMembersMap.delete(id);
  }

  // Research methods
  async getResearchProject(id: number): Promise<ResearchProject | undefined> {
    return this.researchProjectsMap.get(id);
  }

  async getPublicResearchProjects(): Promise<ResearchProject[]> {
    return Array.from(this.researchProjectsMap.values())
      .filter((project) => project.isPublic);
  }

  async getAllResearchProjects(): Promise<ResearchProject[]> {
    return Array.from(this.researchProjectsMap.values());
  }

  async createResearchProject(researchData: InsertResearchProject): Promise<ResearchProject> {
    const id = this.researchProjectIdCounter++;
    const researchProject: ResearchProject = { ...researchData, id };
    this.researchProjectsMap.set(id, researchProject);
    return researchProject;
  }

  async updateResearchProject(id: number, researchData: Partial<ResearchProject>): Promise<ResearchProject | undefined> {
    const existingProject = this.researchProjectsMap.get(id);
    if (!existingProject) return undefined;

    const updatedProject = { ...existingProject, ...researchData };
    this.researchProjectsMap.set(id, updatedProject);
    return updatedProject;
  }

  async deleteResearchProject(id: number): Promise<boolean> {
    return this.researchProjectsMap.delete(id);
  }

  // Course methods
  async getCourse(id: number): Promise<Course | undefined> {
    return this.coursesMap.get(id);
  }

  async getPublicCourses(): Promise<Course[]> {
    return Array.from(this.coursesMap.values())
      .filter((course) => course.isPublic);
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.coursesMap.values());
  }

  async createCourse(courseData: InsertCourse): Promise<Course> {
    const id = this.courseIdCounter++;
    const course: Course = { ...courseData, id };
    this.coursesMap.set(id, course);
    return course;
  }

  async updateCourse(id: number, courseData: Partial<Course>): Promise<Course | undefined> {
    const existingCourse = this.coursesMap.get(id);
    if (!existingCourse) return undefined;

    const updatedCourse = { ...existingCourse, ...courseData };
    this.coursesMap.set(id, updatedCourse);
    return updatedCourse;
  }

  async deleteCourse(id: number): Promise<boolean> {
    return this.coursesMap.delete(id);
  }

  // Course Material methods
  async getCourseMaterial(id: number): Promise<CourseMaterial | undefined> {
    return this.courseMaterialsMap.get(id);
  }

  async getCourseMaterialsByCourse(courseId: number): Promise<CourseMaterial[]> {
    return Array.from(this.courseMaterialsMap.values())
      .filter((material) => material.courseId === courseId);
  }

  async getAllCourseMaterials(): Promise<CourseMaterial[]> {
    return Array.from(this.courseMaterialsMap.values());
  }

  async createCourseMaterial(materialData: InsertCourseMaterial): Promise<CourseMaterial> {
    const id = this.courseMaterialIdCounter++;
    const material: CourseMaterial = { ...materialData, id };
    this.courseMaterialsMap.set(id, material);
    return material;
  }

  async updateCourseMaterial(id: number, materialData: Partial<CourseMaterial>): Promise<CourseMaterial | undefined> {
    const existingMaterial = this.courseMaterialsMap.get(id);
    if (!existingMaterial) return undefined;

    const updatedMaterial = { ...existingMaterial, ...materialData };
    this.courseMaterialsMap.set(id, updatedMaterial);
    return updatedMaterial;
  }

  async deleteCourseMaterial(id: number): Promise<boolean> {
    return this.courseMaterialsMap.delete(id);
  }

  // Support Ticket methods
  async getSupportTicket(id: number): Promise<SupportTicket | undefined> {
    return this.supportTicketsMap.get(id);
  }

  async getAllSupportTickets(): Promise<SupportTicket[]> {
    return Array.from(this.supportTicketsMap.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getOpenSupportTickets(): Promise<SupportTicket[]> {
    return Array.from(this.supportTicketsMap.values())
      .filter((ticket) => ticket.status !== "resolved")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createSupportTicket(ticketData: InsertSupportTicket): Promise<SupportTicket> {
    const id = this.supportTicketIdCounter++;
    const ticket: SupportTicket = { 
      ...ticketData, 
      id, 
      status: "open", 
      createdAt: new Date(), 
      resolvedAt: undefined 
    };
    this.supportTicketsMap.set(id, ticket);
    return ticket;
  }

  async updateSupportTicket(id: number, ticketData: Partial<SupportTicket>): Promise<SupportTicket | undefined> {
    const existingTicket = this.supportTicketsMap.get(id);
    if (!existingTicket) return undefined;

    const updatedTicket = { ...existingTicket, ...ticketData };
    this.supportTicketsMap.set(id, updatedTicket);
    return updatedTicket;
  }

  async deleteSupportTicket(id: number): Promise<boolean> {
    return this.supportTicketsMap.delete(id);
  }

  // Announcement methods
  async getAnnouncement(id: number): Promise<Announcement | undefined> {
    return this.announcementsMap.get(id);
  }

  async getActiveAnnouncements(): Promise<Announcement[]> {
    const now = new Date();
    return Array.from(this.announcementsMap.values())
      .filter((announcement) => {
        return announcement.active && 
          (!announcement.expiresAt || new Date(announcement.expiresAt) > now);
      });
  }

  async getPublicActiveAnnouncements(): Promise<Announcement[]> {
    const now = new Date();
    return Array.from(this.announcementsMap.values())
      .filter((announcement) => {
        return announcement.active && 
          announcement.isPublic && 
          (!announcement.expiresAt || new Date(announcement.expiresAt) > now);
      });
  }

  async getAllAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcementsMap.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createAnnouncement(announcementData: InsertAnnouncement): Promise<Announcement> {
    const id = this.announcementIdCounter++;
    const announcement: Announcement = { ...announcementData, id, createdAt: new Date() };
    this.announcementsMap.set(id, announcement);
    return announcement;
  }

  async updateAnnouncement(id: number, announcementData: Partial<Announcement>): Promise<Announcement | undefined> {
    const existingAnnouncement = this.announcementsMap.get(id);
    if (!existingAnnouncement) return undefined;

    const updatedAnnouncement = { ...existingAnnouncement, ...announcementData };
    this.announcementsMap.set(id, updatedAnnouncement);
    return updatedAnnouncement;
  }

  async deleteAnnouncement(id: number): Promise<boolean> {
    return this.announcementsMap.delete(id);
  }

  // Stats methods
  async getAdminStats(): Promise<{
    totalUsers: number;
    studentCount: number;
    adminCount: number;
    pendingApprovals: number;
    totalCourses: number;
    totalResearchProjects: number;
    totalNewsEvents: number;
    totalSupportTickets: number;
    openTickets: number;
  }> {
    const users = Array.from(this.usersMap.values());
    const openTickets = await this.getOpenSupportTickets();

    return {
      totalUsers: users.length,
      studentCount: users.filter(user => user.role === UserRole.STUDENT).length,
      adminCount: users.filter(user => user.role === UserRole.ADMIN).length,
      pendingApprovals: users.filter(user => !user.verified).length,
      totalCourses: this.coursesMap.size,
      totalResearchProjects: this.researchProjectsMap.size,
      totalNewsEvents: this.newsEventsMap.size,
      totalSupportTickets: this.supportTicketsMap.size,
      openTickets: openTickets.length
    };
  }
}

// Database implementation of the storage interface
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return !!result;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  // News & Events methods
  async getNewsEvent(id: number): Promise<NewsEvent | undefined> {
    const [event] = await db.select().from(newsEvents).where(eq(newsEvents.id, id));
    return event;
  }

  async getPublicNewsEvents(): Promise<NewsEvent[]> {
    return await db
      .select()
      .from(newsEvents)
      .where(eq(newsEvents.isPublic, true))
      .orderBy(desc(newsEvents.date));
  }

  async getAllNewsEvents(): Promise<NewsEvent[]> {
    return await db
      .select()
      .from(newsEvents)
      .orderBy(desc(newsEvents.date));
  }

  async createNewsEvent(newsEventData: InsertNewsEvent): Promise<NewsEvent> {
    const [newsEvent] = await db
      .insert(newsEvents)
      .values(newsEventData)
      .returning();
    return newsEvent;
  }

  async updateNewsEvent(id: number, newsEventData: Partial<NewsEvent>): Promise<NewsEvent | undefined> {
    const [updatedNewsEvent] = await db
      .update(newsEvents)
      .set(newsEventData)
      .where(eq(newsEvents.id, id))
      .returning();
    return updatedNewsEvent;
  }

  async deleteNewsEvent(id: number): Promise<boolean> {
    const result = await db.delete(newsEvents).where(eq(newsEvents.id, id));
    return !!result;
  }

  // Faculty methods
  async getFacultyMember(id: number): Promise<FacultyMember | undefined> {
    const [facultyMember] = await db.select().from(facultyMembers).where(eq(facultyMembers.id, id));
    return facultyMember;
  }

  async getPublicFacultyMembers(): Promise<FacultyMember[]> {
    return await db.select().from(facultyMembers);
  }

  async getAllFacultyMembers(): Promise<FacultyMember[]> {
    return await db.select().from(facultyMembers);
  }

  async createFacultyMember(faculty: InsertFacultyMember): Promise<FacultyMember> {
    const [facultyMember] = await db
      .insert(facultyMembers)
      .values(faculty)
      .returning();
    return facultyMember;
  }

  async updateFacultyMember(id: number, faculty: Partial<FacultyMember>): Promise<FacultyMember | undefined> {
    const [updatedFacultyMember] = await db
      .update(facultyMembers)
      .set(faculty)
      .where(eq(facultyMembers.id, id))
      .returning();
    return updatedFacultyMember;
  }

  async deleteFacultyMember(id: number): Promise<boolean> {
    const result = await db.delete(facultyMembers).where(eq(facultyMembers.id, id));
    return !!result;
  }

  // Research methods
  async getResearchProject(id: number): Promise<ResearchProject | undefined> {
    const [project] = await db.select().from(researchProjects).where(eq(researchProjects.id, id));
    return project;
  }

  async getPublicResearchProjects(): Promise<ResearchProject[]> {
    return await db
      .select()
      .from(researchProjects)
      .where(eq(researchProjects.isPublic, true));
  }

  async getAllResearchProjects(): Promise<ResearchProject[]> {
    return await db.select().from(researchProjects);
  }

  async createResearchProject(research: InsertResearchProject): Promise<ResearchProject> {
    const [researchProject] = await db
      .insert(researchProjects)
      .values(research)
      .returning();
    return researchProject;
  }

  async updateResearchProject(id: number, research: Partial<ResearchProject>): Promise<ResearchProject | undefined> {
    const [updatedResearchProject] = await db
      .update(researchProjects)
      .set(research)
      .where(eq(researchProjects.id, id))
      .returning();
    return updatedResearchProject;
  }

  async deleteResearchProject(id: number): Promise<boolean> {
    const result = await db.delete(researchProjects).where(eq(researchProjects.id, id));
    return !!result;
  }

  // Course methods
  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async getPublicCourses(): Promise<Course[]> {
    return await db
      .select()
      .from(courses)
      .where(eq(courses.isPublic, true));
  }

  async getAllCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db
      .insert(courses)
      .values(course)
      .returning();
    return newCourse;
  }

  async updateCourse(id: number, course: Partial<Course>): Promise<Course | undefined> {
    const [updatedCourse] = await db
      .update(courses)
      .set(course)
      .where(eq(courses.id, id))
      .returning();
    return updatedCourse;
  }

  async deleteCourse(id: number): Promise<boolean> {
    const result = await db.delete(courses).where(eq(courses.id, id));
    return !!result;
  }

  // Course Material methods
  async getCourseMaterial(id: number): Promise<CourseMaterial | undefined> {
    const [material] = await db.select().from(courseMaterials).where(eq(courseMaterials.id, id));
    return material;
  }

  async getCourseMaterialsByCourse(courseId: number): Promise<CourseMaterial[]> {
    return await db
      .select()
      .from(courseMaterials)
      .where(eq(courseMaterials.courseId, courseId));
  }

  async getAllCourseMaterials(): Promise<CourseMaterial[]> {
    return await db.select().from(courseMaterials);
  }

  async createCourseMaterial(material: InsertCourseMaterial): Promise<CourseMaterial> {
    const [newMaterial] = await db
      .insert(courseMaterials)
      .values(material)
      .returning();
    return newMaterial;
  }

  async updateCourseMaterial(id: number, material: Partial<CourseMaterial>): Promise<CourseMaterial | undefined> {
    const [updatedMaterial] = await db
      .update(courseMaterials)
      .set(material)
      .where(eq(courseMaterials.id, id))
      .returning();
    return updatedMaterial;
  }

  async deleteCourseMaterial(id: number): Promise<boolean> {
    const result = await db.delete(courseMaterials).where(eq(courseMaterials.id, id));
    return !!result;
  }

  // Support Ticket methods
  async getSupportTicket(id: number): Promise<SupportTicket | undefined> {
    const [ticket] = await db.select().from(supportTickets).where(eq(supportTickets.id, id));
    return ticket;
  }

  async getAllSupportTickets(): Promise<SupportTicket[]> {
    return await db.select().from(supportTickets);
  }

  async getOpenSupportTickets(): Promise<SupportTicket[]> {
    return await db
      .select()
      .from(supportTickets)
      .where(eq(supportTickets.status, "open"));
  }

  async createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket> {
    const [newTicket] = await db
      .insert(supportTickets)
      .values({
        ...ticket,
        status: "open"
      })
      .returning();
    return newTicket;
  }

  async updateSupportTicket(id: number, ticket: Partial<SupportTicket>): Promise<SupportTicket | undefined> {
    let updatedData = { ...ticket };
    
    // If status is changed to resolved, set resolvedAt date
    if (ticket.status === "resolved") {
      updatedData.resolvedAt = new Date();
    }
    
    const [updatedTicket] = await db
      .update(supportTickets)
      .set(updatedData)
      .where(eq(supportTickets.id, id))
      .returning();
    return updatedTicket;
  }

  async deleteSupportTicket(id: number): Promise<boolean> {
    const result = await db.delete(supportTickets).where(eq(supportTickets.id, id));
    return !!result;
  }

  // Announcement methods
  async getAnnouncement(id: number): Promise<Announcement | undefined> {
    const [announcement] = await db.select().from(announcements).where(eq(announcements.id, id));
    return announcement;
  }

  async getActiveAnnouncements(): Promise<Announcement[]> {
    const now = new Date();
    return await db
      .select()
      .from(announcements)
      .where(
        and(
          eq(announcements.active, true),
          or(
            isNull(announcements.expiresAt),
            gte(announcements.expiresAt, now)
          )
        )
      );
  }

  async getPublicActiveAnnouncements(): Promise<Announcement[]> {
    const now = new Date();
    return await db
      .select()
      .from(announcements)
      .where(
        and(
          eq(announcements.active, true),
          eq(announcements.isPublic, true),
          or(
            isNull(announcements.expiresAt),
            gte(announcements.expiresAt, now)
          )
        )
      );
  }

  async getAllAnnouncements(): Promise<Announcement[]> {
    return await db.select().from(announcements);
  }

  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const [newAnnouncement] = await db
      .insert(announcements)
      .values(announcement)
      .returning();
    return newAnnouncement;
  }

  async updateAnnouncement(id: number, announcement: Partial<Announcement>): Promise<Announcement | undefined> {
    const [updatedAnnouncement] = await db
      .update(announcements)
      .set(announcement)
      .where(eq(announcements.id, id))
      .returning();
    return updatedAnnouncement;
  }

  async deleteAnnouncement(id: number): Promise<boolean> {
    const result = await db.delete(announcements).where(eq(announcements.id, id));
    return !!result;
  }

  // Stats
  async getAdminStats(): Promise<{
    totalUsers: number;
    studentCount: number;
    adminCount: number;
    pendingApprovals: number;
    totalCourses: number;
    totalResearchProjects: number;
    totalNewsEvents: number;
    totalSupportTickets: number;
    openTickets: number;
  }> {
    const allUsers = await db.select().from(users);
    const courseCount = await db.select().from(courses).then(results => results.length);
    const researchCount = await db.select().from(researchProjects).then(results => results.length);
    const newsCount = await db.select().from(newsEvents).then(results => results.length);
    const ticketCount = await db.select().from(supportTickets).then(results => results.length);
    const openTicketCount = await db
      .select()
      .from(supportTickets)
      .where(eq(supportTickets.status, "open"))
      .then(results => results.length);
    
    return {
      totalUsers: allUsers.length,
      studentCount: allUsers.filter(user => user.role === UserRole.STUDENT).length,
      adminCount: allUsers.filter(user => user.role === UserRole.ADMIN).length,
      pendingApprovals: allUsers.filter(user => !user.verified).length,
      totalCourses: courseCount,
      totalResearchProjects: researchCount,
      totalNewsEvents: newsCount,
      totalSupportTickets: ticketCount,
      openTickets: openTicketCount
    };
  }
}

// Switch from in-memory storage to database storage
export const storage = new DatabaseStorage();
