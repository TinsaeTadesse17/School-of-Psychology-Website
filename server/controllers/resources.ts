import { Request, Response } from 'express';

export const resourcesController = {
  // Student resources
  getStudentResources: async (_req: Request, res: Response) => {
    try {
      // Return a static list of resources for students
      const resources = [
        {
          id: 1,
          title: "Academic Resources",
          description: "Access course catalogs, degree requirements, and research guides to support your academic journey.",
          icon: "book",
          link: "/resources/academic"
        },
        {
          id: 2,
          title: "Counseling Services",
          description: "Free and confidential counseling services are available to all AAU students.",
          icon: "counseling",
          link: "/resources/counseling"
        },
        {
          id: 3,
          title: "Research Opportunities",
          description: "Explore opportunities to participate in ongoing research projects within the Psychology Department.",
          icon: "research",
          link: "/resources/research"
        },
        {
          id: 4,
          title: "Event Calendar",
          description: "View upcoming department events, workshops, seminars, and important academic dates.",
          icon: "calendar",
          link: "/resources/calendar"
        },
        {
          id: 5,
          title: "Student Organizations",
          description: "Connect with psychology-focused student groups and professional organizations.",
          icon: "organizations",
          link: "/resources/organizations"
        },
        {
          id: 6,
          title: "Support Services",
          description: "Find information about academic tutoring, writing support, and other student services.",
          icon: "support",
          link: "/resources/support"
        }
      ];
      
      return res.status(200).json({ resources });
    } catch (error) {
      console.error('Get student resources error:', error);
      return res.status(500).json({ 
        message: 'Failed to get resources', 
        error: (error as Error).message 
      });
    }
  },
};