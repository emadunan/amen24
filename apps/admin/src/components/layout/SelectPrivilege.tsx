import { Profile, UserPrivilege } from '@amen24/shared'
import { FC } from 'react';
import styles from './SelectPrivilege.module.css'
import { useUpdateUserProfileMutation } from '../../store/userApi';

interface Props {
  member: Profile,
}

const privilegeOptions = Object.values(UserPrivilege);

const SelectPrivilege: FC<Props> = ({ member }) => {
  const [updateProfile] = useUpdateUserProfileMutation();

  const handleChangePrivilege = async (email: string, privilege: UserPrivilege) => {
    console.log(email, privilege);
    
    updateProfile({ email, privilege })
  };

  return (
    <select
      id={`privilege-${member.email}`}
      className={styles.select}
      value={member.privilege}
      onChange={(e) => handleChangePrivilege(member.email, e.target.value as UserPrivilege)}
    >
      {privilegeOptions.map((p) => (
        <option key={p} value={p}>{p.toUpperCase()}</option>
      ))}
    </select>
  )
}

export default SelectPrivilege