import { useEffect, useRef, useState } from "react"

export const OTPInputComponent = ({length,onOTPSubmit} : {length:number,onOTPSubmit:(otp:string) => void}) => {
    const [otp,setOTP] = useState(new Array(length).fill(''));
    const inputRef = useRef<HTMLInputElement[]>([])

    useEffect(() => {
        if (inputRef.current[0]){
            inputRef.current[0].focus();
        }
    },[])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>,index:number) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;

        const newOTP = [...otp]
        newOTP[index] = value.substring(value.length - 1)
        setOTP(newOTP)

        const combineOTP = newOTP.join('')
        if (combineOTP.length === length) {
            onOTPSubmit(combineOTP)
        }

        if (value && index < length -1 && inputRef.current[index]){
            inputRef.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>,index:number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRef.current[index -1]) {
            inputRef.current[index-1].focus();
        }
    }
    return (
        <>
            {
                otp.map((value,index) => (
                    <input
                        key={index}
                        type="text"
                        ref={(input) => (inputRef.current[index] = input!)} 
                        value={value}
                        onChange={(e) => handleChange(e,index)}
                        onKeyDown={(e) => handleKeyDown(e,index)}
                        className="size-[40px] m-[5px] border rounded-lg text-center"
                    />
                ))
            }
        </>
    )
}