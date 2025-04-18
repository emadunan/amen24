import { useState } from 'react';
import styles from './Login.module.css';
import { useLoginMutation } from '../store/authApi';
import { useNavigate } from 'react-router-dom';
import {  } from "@amen24/ui";

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