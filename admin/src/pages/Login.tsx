import { useState } from 'react';
import InputItem from '../components/ui/InputItem';
import styles from './Login.module.css';
import SubmitButton from '../components/ui/SubmitButton';
import { useLoginMutation } from '../store/authApi';
import Spinner from '../components/ui/Spinner';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLocalLoading(true);

    try {
      await login({ email, password }).unwrap();
      navigate("/");
    } catch (err) {
      // showApiError(err);
      setLocalLoading(false);
    }
  }

  if (isLoading || localLoading) {
    return <div className={styles.container}><Spinner /></div>
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputItem
          type="email"
          value={email}
          onSetValue={setEmail}
          placeholder={`Email`}
          required
        />
        <InputItem
          type="password"
          value={password}
          onSetValue={setPassword}
          placeholder={`Password`}
          required
        />

        <SubmitButton
          isLoading={isLoading || localLoading}
          text={"Login"}
        />
      </form>
    </div>
  )
}

export default Login