import { Eye, EyeOff} from "lucide-react"
import { useState } from "react"

interface IInputProps {
    label: string,
    type: 'text' | 'password',
    placeholder: string,
    value: string,
    icon: React.ElementType,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputComponent = ({ label, type, icon: ICon, placeholder, value, onChange }: IInputProps) => {
    const [showHide, setShowHide] = useState(false);
    const handleShow = () => {
        setShowHide(hide => !hide)
    }
    const typeProp = type === 'password' && showHide ? 'text' : type
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text font-medium">{label}</span>
            </label>
            <div className="relative">
                <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ICon className="size-5 text-base-content/40" />
                </div>
                <input
                    type={typeProp}
                    className={`input input-bordered w-full pl-10`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {type === 'password' && (
                    <button
                        onClick={handleShow}
                        className=" absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showHide ? (
                            <Eye className="size-5 " />
                        ) : (
                            <EyeOff className="size-5 text-base-content/40" />
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}