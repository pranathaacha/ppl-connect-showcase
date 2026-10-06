// Sanitized adaptation for the public PPL Connect case study.
// Roles and identifiers are generic examples, not production configuration.

export const APP_ROLES = [
  "employee",
  "manager",
  "hr-admin",
  "business-admin",
  "technical-admin"
] as const;

export type AppRole = (typeof APP_ROLES)[number];

export type AppUser = {
  id: string;
  email: string;
  role: AppRole;
  employeeId: string | null;
  isActive: boolean;
};

export class AuthorizationError extends Error {
  constructor(message = "Not authorized") {
    super(message);
  }
}

export function requireActiveUser(user: AppUser): void {
  if (!user.isActive) {
    throw new AuthorizationError(
      "Application access is inactive."
    );
  }
}

export function requireRole(
  user: AppUser,
  allowedRoles: readonly AppRole[]
): void {
  requireActiveUser(user);

  if (!allowedRoles.includes(user.role)) {
    throw new AuthorizationError(
      "This action is not available for the current role."
    );
  }
}

export function requireTechnicalAdmin(
  user: AppUser
): void {
  requireRole(user, ["technical-admin"]);
}

export function canManageEmployeeWorkflow(
  user: AppUser
): boolean {
  return [
    "manager",
    "hr-admin",
    "business-admin",
    "technical-admin"
  ].includes(user.role);
}
