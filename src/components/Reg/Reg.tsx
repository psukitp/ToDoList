import { Typography, Input, Button, Alert } from '@mui/material'
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { userApi } from '../../api/userApi';
import { useStore } from '../../store/store';
import { observer } from 'mobx-react-lite';

const Reg = observer(() => {
    const { userStore } = useStore();
    const [form, setForm] = useState({ name: '', s_name: '', patronymic: '', login: '', password: '', password_repeat: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (userStore.user_id > 0) {
            navigate('/projects')
        }

    }, [userStore.user_id])

    const handleChange = (e: { target: { name: string; value: string } }) => {
        if (e.target.name === 'name') {
            setForm({ ...form, name: e.target.value })
        } else if (e.target.name === 's_name') {
            setForm({ ...form, s_name: e.target.value })
        } else if (e.target.name === 'patronymic') {
            setForm({ ...form, patronymic: e.target.value })
        } else if (e.target.name === 'login') {
            setForm({ ...form, login: e.target.value })
        } else if (e.target.name === 'password') {
            setForm({ ...form, password: e.target.value })
        } else {
            setForm({ ...form, password_repeat: e.target.value })
        }
    }

    const handleSubmitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const checkEmpty = form.name !== '' && form.s_name !== '' && form.patronymic !== '' && form.login !== '' && form.password !== '';
        const passwordIsEqual = form.password === form.password_repeat;
        if (checkEmpty && passwordIsEqual) {
            userApi.registration(form)
                .then(response => response.data)
                .then(data => {
                    userStore.setNewValues(data.user)
                    userStore.setLoggedIn(data.accessToken)
                })
                .catch(e => {
                    setError(e.response.data)
                })
        } else if (!checkEmpty) {
            setError('Заполнены не все поля')
        } else {
            setError('Пароли не совпадают')
        }
    }

    return (
        <>
            <div className="reg">
                <Typography
                    fontWeight={900}
                    fontSize={32}
                    sx={{ mb: '25px' }}
                    textAlign='center'>
                    Регистрация
                </Typography >
                <Input
                    name='name'
                    placeholder='Имя'
                    sx={{
                        display: 'block',
                        width: '250px',
                        mb: '25px',
                        mr: 'auto',
                        ml: 'auto'
                    }}
                    onChange={(e) => handleChange(e)}
                    value={form.name} />
                <Input
                    name='s_name'
                    placeholder='Фамилия'
                    sx={{
                        display: 'block',
                        width: '250px',
                        mb: '25px',
                        mr: 'auto',
                        ml: 'auto'
                    }}
                    onChange={(e) => handleChange(e)}
                    value={form.s_name} />
                <Input
                    name='patronymic'
                    placeholder='Отчество'
                    sx={{
                        display: 'block',
                        width: '250px',
                        mb: '25px',
                        mr: 'auto',
                        ml: 'auto'
                    }}
                    onChange={(e) => handleChange(e)}
                    value={form.patronymic} />
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
                    autoComplete='off'
                    type='password'
                    name='password'
                    placeholder='Пароль'
                    sx={{
                        display: 'block',
                        width: '250px',
                        mb: '25px',
                        mr: 'auto',
                        ml: 'auto'
                    }}
                    onChange={(e) => handleChange(e)}
                    value={form.password} />
                <Input
                    autoComplete='off'
                    type='password'
                    name='password_repeat'
                    placeholder='Повторите пароль'
                    sx={{
                        display: 'block',
                        width: '250px',
                        mr: 'auto',
                        ml: 'auto'
                    }}
                    onChange={(e) => handleChange(e)}
                    value={form.password_repeat} />
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
                    <NavLink to='/auth' style={{ textDecoration: 'none', color: 'black' }}>
                        Есть аккаунт? Войти
                    </NavLink>
                </Typography >
                <Button
                    onClick={(e) => handleSubmitForm(e)}
                    sx={{
                        display: 'block',
                        mr: 'auto',
                        ml: 'auto'
                    }}>
                    Регистрация
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

export default Reg;