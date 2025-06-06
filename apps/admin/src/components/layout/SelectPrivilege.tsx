import { FC } from "react";
import styles from "./SelectPrivilege.module.css";
import { Profile, UserRole } from "@amen24/shared";
import { useUpdateUserProfileMutation } from "../../store/profileApi";

interface Props {
  member: Profile;
}

const roleOptions = Object.values(UserRole);

const SelectRoles: FC<Props> = ({ member }) => {
  const [updateProfile] = useUpdateUserProfileMutation();

  const handleRoleToggle = async (role: UserRole) => {
    const currentRoles = member.roles || [];
    const hasRole = currentRoles.includes(role);

    const updatedRoles = hasRole
      ? currentRoles.filter((r) => r !== role)
      : [...currentRoles, role];

    updateProfile({ email: member.email, roles: updatedRoles });
  };

  return (
    <div className={styles.rolesContainer}>
      {roleOptions.map((role) => (
        <label key={role} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={member.roles?.includes(role)}
            onChange={() => handleRoleToggle(role)}
          />
          {role.toUpperCase()}
        </label>
      ))}
    </div>
  );
};

export default SelectRoles;
