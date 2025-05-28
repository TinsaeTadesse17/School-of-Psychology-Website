import { Request, Response, NextFunction } from "express";
import { verifyToken, TokenPayload } from "../utils/jwt";
import { storage } from "../storage";
import { UserRole } from "@shared/schema";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: UserRole;
      };
    }
  }
}

export const authenticate = (allowedRoles?: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = extractTokenFromRequest(req);
      
      if (!token) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const payload = verifyToken(token) as TokenPayload;
      
      if (!payload || !payload.id) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const user = await storage.getUser(payload.id);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (!user.verified) {
        return res.status(403).json({ message: "Account not verified" });
      }

      if (allowedRoles && !allowedRoles.includes(user.role as UserRole)) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role as UserRole,
      };

      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({ message: "Authentication failed" });
    }
  };
};

function extractTokenFromRequest(req: Request): string | null {
  // First, check for token in the request cookies
  const tokenCookie = req.cookies?.token;
  if (tokenCookie) {
    return tokenCookie;
  }

  // Next, check for token in the Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  return null;
}
