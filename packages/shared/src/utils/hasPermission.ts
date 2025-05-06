import { RolePermissions } from "../constants/role-permission.constant";
import { UserRole, Permission } from "../enums";

export const hasPermission = (
  roles: UserRole[],
  permission: Permission
): boolean => {
  return roles.some(role =>
    RolePermissions[role]?.includes(permission)
  );
};