import { describe, expect, it } from "vitest";
import { canAccessRole } from "./roles";

describe("canAccessRole", () => {
  it("allows superadmins to access every role-protected area", () => {
    expect(canAccessRole("superadmin", "superadmin")).toBe(true);
    expect(canAccessRole("superadmin", "organizer")).toBe(true);
  });

  it("does not allow regular admins into superadmin areas", () => {
    expect(canAccessRole("admin", "organizer")).toBe(true);
    expect(canAccessRole("admin", "superadmin")).toBe(false);
  });

  it("requires an exact role match for non-admin users", () => {
    expect(canAccessRole("attendee", "attendee")).toBe(true);
    expect(canAccessRole("attendee", "admin")).toBe(false);
  });
});
