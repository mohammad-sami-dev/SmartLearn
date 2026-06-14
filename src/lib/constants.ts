// Application constants

// File upload limits
export const MAX_FILE_SIZE_MB = 50;
export const MAX_FILES_PER_UPLOAD = 10;

export const ALLOWED_FILE_TYPES = {
  documents: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
  ],
  images: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  videos: ["video/mp4", "video/webm", "video/ogg"],
  code: [
    "text/plain",
    "application/x-python",
    "application/javascript",
    "text/html",
    "text/css",
  ],
  archives: ["application/zip", "application/x-rar-compressed", "application/x-7z-compressed"],
};

// Course settings
export const COURSE_CREDITS = [1, 2, 3, 4, 5, 6];
export const COURSE_CAPACITY_OPTIONS = [10, 20, 30, 50, 75, 100, 150, 200];

// Assignment settings
export const ASSIGNMENT_MAX_ATTEMPTS = [1, 2, 3, "unlimited"];
export const LATE_PENALTY_OPTIONS = [0, 5, 10, 15, 20, 25];

// Grading
export const GRADE_SCALE = {
  A: { min: 90, max: 100 },
  B: { min: 80, max: 89 },
  C: { min: 70, max: 79 },
  D: { min: 60, max: 69 },
  F: { min: 0, max: 59 },
};

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  MESSAGE: "message",
  ASSIGNMENT: "assignment",
  GRADE: "grade",
} as const;

// User roles
export const USER_ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
} as const;

// Date formats
export const DATE_FORMATS = {
  SHORT: "MMM dd, yyyy",
  LONG: "MMMM dd, yyyy",
  WITH_TIME: "MMM dd, yyyy HH:mm",
  TIME_ONLY: "HH:mm",
};

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// API endpoints (for future backend integration)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  COURSES: {
    LIST: "/courses",
    CREATE: "/courses",
    UPDATE: (id: string) => `/courses/${id}`,
    DELETE: (id: string) => `/courses/${id}`,
    ENROLL: (id: string) => `/courses/${id}/enroll`,
  },
  ASSIGNMENTS: {
    LIST: (courseId: string) => `/courses/${courseId}/assignments`,
    CREATE: "/assignments",
    UPDATE: (id: string) => `/assignments/${id}`,
    DELETE: (id: string) => `/assignments/${id}`,
    SUBMIT: (id: string) => `/assignments/${id}/submit`,
    GRADE: (id: string) => `/assignments/${id}/grade`,
  },
  NOTIFICATIONS: {
    LIST: "/notifications",
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: "/notifications/read-all",
    DELETE: (id: string) => `/notifications/${id}`,
  },
};

// Validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  EMAIL: "Please enter a valid email address",
  PASSWORD_MIN: "Password must be at least 8 characters",
  PASSWORD_MATCH: "Passwords do not match",
  FILE_SIZE: (max: number) => `File size must not exceed ${max}MB`,
  FILE_TYPE: "File type is not supported",
  DATE_RANGE: "End date must be after start date",
  URL: "Please enter a valid URL",
};

// Toast durations (milliseconds)
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
};
