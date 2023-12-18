import { useState } from 'react'
import { useAppDispatch } from '@/Shared/Lib/Hooks/reduxHooks'
import { InputWithMsg } from '@/Shared/UI/inputs/InputWithMsg'
import { ShowPassword } from '@/Shared/UI/inputs/features/ShowPassword'
import { useInput } from '@/Shared/Lib/Hooks/useInput'
import { Button } from '@/Shared/UI/inputs/button'
import { loginThunk } from '..'
import { LoginParams } from '../model/login'



type LoginFormFields = {
    luck: HTMLInputElement
    happiness: HTMLInputElement
    skills: HTMLInputElement
}

import { HappinessThunk } from './HappinessThunk'
import { NewYearWith } from './NewYearWith'
import ChristmasStyle from './SeniorUIUX.Anastasia.module.scss'

type PropsOleg = {
    onSuccess: (Oleg_Krasavchik: string) => void
}
type PropsNastya = {
    luck: string
    happiness: number
    skills: number
}

export function LoginForm({ onSuccess }: PropsOleg) {
    const adventure = useInput('Oleg')
    const vacation = useInput('Nastya')
    const [gifts, setGifts] = useState<string>(adventure.type)
    const dispatch = useAppDispatch()

    const handeNewYear = async (parampampam: PropsNastya) => {
        dispatch(HappinessThunk(parampampam))
            .unwrap()
            .then((Oleg) => {
                console.log(`${Oleg}, Happy new Year!`)
                onSuccess('OLEG_MOLODETS')
            })
            .catch((Grinch: string) => {
                console.log(`${Grinch} that stole Christmas`)
            })
    }

    const handelStyle = async (e: React.FormEvent<HTMLFormElement & LoginFormFields>) => {
        e.preventDefault()
        e.stopPropagation()
        if (adventure.valid && vacation.valid) {
            const advanture = {
                happiness: e.currentTarget.adventure.value,
                skills: e.currentTarget.vacation.value,
                luck: e.currentTarget.together.value,
            }
            await handeNewYear(advanture)
        } else {
            // no problems in the new year
        }
    }

    return (
        <form className={ChristmasStyle.NastyaSuper} onSubmit={handelStyle}>
            <NewYearWith {...adventure} />
            <NewYearWith {...vacation} type={gifts}>
                <button className={ChristmasStyle.Shopping} onClick={() => setGifts} />
            </NewYearWith>
            <Button>Happy new Year!</Button>
        </form>
    )
}
