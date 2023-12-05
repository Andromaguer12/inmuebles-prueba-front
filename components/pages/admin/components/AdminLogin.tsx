"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import styles from '../styles/AdminLogin.module.scss';
import useFetchingContext from '../../../../contexts/backendConection/hook';
import { clearStateUser, userLoginFunction, userLogoutFunction } from '../../../../services/redux/reducers/user/actions';
import CustomizedAlert from '../../../commonLayout/CustomizedAlert/CustomizedAlert';
import Image from 'next/image';
import Logo from '../../../../assets/pages/home/logoNoBackground.png';
import { useAppDispatch, useAppSelector } from '../../../../services/redux/store';
import { Login } from '@mui/icons-material';
import { AllRoutes } from '../../../../constants/routes/routes';

type FormData = {
  email: string;
  password: string;
};

export default function AdminLogin() {
  const dispatch = useAppDispatch();
  const fbContext = useFetchingContext();
  const router = useRouter();

  const { loading, permissions, success, error: errorLogin } = useAppSelector(({ user }) => user)

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });


  const [error, setError] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Por favor, rellena todos los campos');
    } else {
      setError('');

      dispatch(
        userLoginFunction({
          context: fbContext,
          email: formData.email,
          password: formData.password
        })
      )
    }
  };

  useEffect(() => {
    if(errorLogin) {
      setError(errorLogin?.message)
    }
  }, [errorLogin])
  

  useEffect(() => {
    if(permissions === 'admin' && success){
      router.push(AllRoutes.ADMIN_DASHBOARD)
    }
    if(success && permissions !== 'admin') {
      setError('El usuario no tiene permisos')
      dispatch(userLogoutFunction())
      dispatch(clearStateUser())
    }
  }, [permissions, success])
  

  return (
    <div className={styles.Login}>
      <Grid
      container
      className={styles.loginContainer}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Grid
        item
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        className={styles.loginForm}
      >
        <div className={styles.logoAndSearch}>
          <Image
            src={Logo}
            className={styles.image}
            alt={'inmuebles-sol-logo'}
            />
        </div>
        <Typography className={styles.title} align="center">
          INMOBILIARIA EL SOL
        </Typography>
        <Typography className={styles.subtitle}>Admin / Iniciar sesión</Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            className={styles.input}
            label="Email"
            name="email"
            type="email"
            fullWidth
            color="primary"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            className={styles.input}
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            color="primary"
            value={formData.password}
            onChange={handleChange}
            style={{ marginBottom: "10px" }}
          />
          {error && (
            <CustomizedAlert noElevation type="error" message={error} />
          )}
          <Button
            fullWidth
            disableElevation
            className={styles.button}
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<Login />}
          >
            {loading ? (
              <CircularProgress size={'15px'} sx={{ color: "#fff", margin: '8px 0'}} />
            ) : (
              "Iniciar sesion"
            )}
          </Button>
        </form>
      </Grid>
    </Grid>
    </div>
    
  );
}
