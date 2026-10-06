// Sanitized adaptation for the public PPL Connect case study.
// This example shows the style of authorization regression testing.

import { describe, expect, it } from "vitest";
import {
  AuthorizationError,
  requireRole,
  type AppUser
} from "./role-authorization.js";

function user(role: AppUser["role"]): AppUser {
  return {
    id: "00000000-0000-4000-8000-000000000001",
    email: "user@example.com",
    role,
    employeeId: "00000000-0000-4000-8000-000000000002",
    isActive: true
  };
}

describe("server-side role authorization", () => {
  it("allows an HR administrator to perform an HR action", () => {
    expect(() =>
      requireRole(user("hr-admin"), [
        "hr-admin",
        "technical-admin"
      ])
    ).not.toThrow();
  });

  it("rejects an employee from an HR-only action", () => {
    expect(() =>
      requireRole(user("employee"), [
        "hr-admin",
        "technical-admin"
      ])
    ).toThrow(AuthorizationError);
  });

  it("rejects an inactive user even when the stored role is elevated", () => {
    const inactiveAdmin = {
      ...user("technical-admin"),
      isActive: false
    };

    expect(() =>
      requireRole(inactiveAdmin, ["technical-admin"])
    ).toThrow(AuthorizationError);
  });
});
