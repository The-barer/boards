import showIcon from '@assets/icons/show.svg'
import hideIcon from '@assets/icons/Hide.svg'
import warningIcon from '@assets/icons/warning.svg'
import './TextInput.scss'

export const TextInput = () => {
    const element = {
        label: 'Label',
        placeholder: 'placeholder',
        type: 'password',
        id: 'id',
        name: 'password',
        onChange: (e: React.FormEvent<HTMLInputElement>): void => {
            console.log(e.currentTarget.value)
        },
        onBlur: (e: React.FormEvent<HTMLInputElement>): void => {
            console.log(e.currentTarget.value)
        },
    }
    const { label, placeholder, type, id, name } = element
    const errorMessage = 'Error message'

    return (
        <div className="">
            <label className={`label ${errorMessage && 'invalid'}`}>{label}</label>
            <div className="inputField">
                <input
                    placeholder={placeholder}
                    id={id}
                    type={type}
                    name={name}
                    onChange={element.onChange}
                    onBlur={element.onBlur}
                    className={`input ${errorMessage ? 'invalid' : 'valid'}`}
                />
                <img
                    src={showIcon}
                    alt="Show password"
                    className={`${!errorMessage && 'invalid'}`}
                />
                <img
                    src={hideIcon}
                    alt="Hide password"
                    className={`${errorMessage && 'invalid'}`}
                />
            </div>
            <div className={`error-message`}>
                <img src={warningIcon} alt="warning" />
                <span>{errorMessage}</span>
            </div>
        </div>
    )
}
