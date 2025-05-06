import { UserRole, Permission } from "../enums";

export const RolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.LOGIN_ADMINSITE,
    Permission.READ_DASHBOARD,
    Permission.READ_AUDITING,
    Permission.READ_MEMBERS,
    Permission.WRITE_MEMBERS,
    Permission.MANAGE_FEATURED,
    Permission.MANAGE_VERSE_GROUPS,
  ],
  [UserRole.MANAGER]: [
    Permission.LOGIN_ADMINSITE,
    Permission.READ_DASHBOARD,
    Permission.MANAGE_FEATURED,
    Permission.PUBLISH_LIB_BOOK,
  ],
  [UserRole.MODERATOR]: [
    Permission.LOGIN_ADMINSITE,
    Permission.CREATE_LIB_BOOK,
  ],
  [UserRole.BLOGGER]: [
    Permission.WRITE_BLOG,
  ],
  [UserRole.MEMBER_PLUS]: [],
  [UserRole.MEMBER]: [],
};
