import { Typography, Input, Button, Alert } from '@mui/material'
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/store';
import { userApi } from '../../api/userApi';
import { observer } from 'mobx-react-lite';

const Auth = observer(() => {
    const { userStore } = useStore()
    const [form, setForm] = useState({ login: '', password: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (userStore.user_id > 0) {
            navigate('/projects')
        }
    }, [userStore.user_id])

    const handleChange = (e: { target: { name: string; value: string } }) => {
        if (e.target.name === 'login') {
            setForm({ ...form, login: e.target.value })
        } else {
            setForm({ ...form, password: e.target.value })
        }
    }

    const handleSubmitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (form.login !== '' && form.password !== '') {
            userApi.login(form)
                .then(response => response.data)
                .then(data => {
                    userStore.setNewValues(data.user)
                    userStore.setLoggedIn(data.accessToken)
                })
                .catch(e => {
                    setError(e.response.data)
                })
        }
    }

    return (
        <>
            <div className="auth">
                <Typography
                    fontWeight={900}
                    fontSize={32}
                    sx={{ mb: '25px' }}
                    textAlign='center'>
                    Вход
                </Typography >
                <Input
                    name='login'
                    placeholder='Логин'
                    sx={{
                        display: 'block',
                        width: '250px',
                        mb: '25px',
                        mr: 'auto',
                        ml: 'auto'
                    }}
                    onChange={(e) => handleChange(e)}
                    value={form.login} />
                <Input
                    name='password'
                    type='password'
                    placeholder='Пароль'
                    sx={{
                        display: 'block',
                        width: '250px',
                        mr: 'auto',
                        ml: 'auto'
                    }}
                    onChange={(e) => handleChange(e)}
                    value={form.password} />
                <Typography
                    fontWeight={500}
                    fontSize={12}
                    sx={{
                        mb: '25px',
                        mt: '10px',
                        cursor: 'pointer',
                        ":hover": {
                            opacity: '.8'
                        }
                    }}
                    textAlign='center'
                >
                    <NavLink to='/reg' style={{ textDecoration: 'none', color: 'black' }}>
                        Нет аккаунта? Зарегистрируйся!
                    </NavLink>
                </Typography >
                <Button
                    onClick={(e) => handleSubmitForm(e)}
                    sx={{
                        display: 'block',
                        mr: 'auto',
                        ml: 'auto'
                    }}>
                    Войти
                </Button>
            </div>
            {error !== '' ?
                <Alert
                    severity='error'
                    color='error'
                    sx={{
                        position: 'absolute',
                        right: '20px',
                        top: '100px',
                    }}
                    onClose={() => setError('')}>
                    {error}
                </Alert> : null}
        </>
    )
})

export default Auth;