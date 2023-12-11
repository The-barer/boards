import { sessionApi, useLoginQuery } from '@/Entities/Session'
import { loginThunk } from '@/Features/Authentication/Login'
import { useAppDispatch } from '@/Shared/Lib/Hooks/reduxHooks'

interface ILoginFormProps {
    onSubmit: (data: LoginFormProps) => void
}

type LoginFormProps = {
    email: string
    password: string
}

type FormFields = {
    email: HTMLInputElement
    password: HTMLInputElement
    remember?: HTMLInputElement
}

export default function LoginFormOLD() {
    const dispatch = useAppDispatch()
    const handelSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = async (event) => {
        event.preventDefault()
        const form = event.currentTarget
        const { email, password } = form
        const authData = { email: email.value, password: password.value }
        // const data = await dispatch(sessionApi.endpoints.login.initiate(authData)).unwrap()

        await dispatch(loginThunk(authData))
            .unwrap()
            .then((data) => console.log(data))
            .catch((error) => {
                console.log('email', { type: 'server', message: error.message })
            })
    }

    return (
        <form
            onSubmit={handelSubmit}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <div
                className="inputs"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    padding: '10px',
                }}
            >
                <label>
                    <span>E-mail: </span>
                    <input type="email" name="email" required />
                </label>
                <label>
                    <span>Password: </span>
                    <input type="password" name="password" required />
                </label>
            </div>

            <button type="submit" style={{ width: 'fit-content' }}>
                Отправить
            </button>
        </form>
    )
}
