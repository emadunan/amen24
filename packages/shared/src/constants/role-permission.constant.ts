import { UserRole, Permission } from "../enums";

export const RolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.LOGIN_ADMINSITE,
    Permission.READ_DASHBOARD,
    Permission.READ_AUDITING,
    Permission.READ_MEMBERS,
    Permission.WRITE_MEMBERS,
    Permission.MANAGE_VERSE_GROUPS,
  ],
  [UserRole.MANAGER]: [
    Permission.LOGIN_ADMINSITE,
    Permission.READ_DASHBOARD,
    Permission.MANAGE_FEATURED,
    Permission.CREATE_GLOSSARY_TERM,
    Permission.UPDATE_GLOSSARY_TERM,
    Permission.APPROVE_GLOSSARY_TERM,
    Permission.CREATE_LIBRARY_BOOK,
    Permission.UPDATE_LIBRARY_BOOK,
    Permission.APPROVE_LIBRARY_BOOK,
    Permission.DELETE_LIBRARY_BOOK,
  ],
  [UserRole.FEATURED_MODERATOR]: [
    Permission.LOGIN_ADMINSITE,
    Permission.READ_DASHBOARD,
    Permission.MANAGE_FEATURED,
  ],
  [UserRole.GLOSSARY_MODERATOR]: [
    Permission.LOGIN_ADMINSITE,
    Permission.READ_DASHBOARD,
    Permission.CREATE_GLOSSARY_TERM,
    Permission.UPDATE_GLOSSARY_TERM,
  ],
  [UserRole.LIBRARY_MODERATOR]: [
    Permission.LOGIN_ADMINSITE,
    Permission.READ_DASHBOARD,
    Permission.CREATE_LIBRARY_BOOK,
    Permission.UPDATE_LIBRARY_BOOK,
  ],
  [UserRole.BLOGGER]: [
    Permission.WRITE_BLOG,
  ],
  [UserRole.MEMBER_PLUS]: [],
  [UserRole.MEMBER]: [],
};
