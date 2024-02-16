import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    label: string
    type: string
    error: string
    valid: boolean
    inputOptions: Partial<InputOptions>
}

type InputOptions = {
    placeholder?: string
    name?: string
    id?: string
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FormEvent<HTMLInputElement>) => void
}

export const NewYearWith = (props: Props) => {
    const { children, label, error, inputOptions, type } = props
    
    return <div>NewYearWith</div>

}


























/ 























































