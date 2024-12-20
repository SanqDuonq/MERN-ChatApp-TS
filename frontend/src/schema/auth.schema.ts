import { object, string, z } from 'zod'

const patternPassword = '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*?-]).{8,32}$'

export const signUpSchema = object({
    body: object({
        fullName: string().min(1, 'Please enter your name'),
        email: string().min(1,'Please enter your email').email().endsWith('@gmail.com','Email must be end with @gmail.com'),
        password: string().min(1,'Please enter your password').regex(new RegExp(patternPassword),'Password must be at least 8 character(s), including 1 uppercase, 1 lowercase, 1 number and 1 special number'),
        confirmPassword: string().min(1,'Please enter your confirm password')
    }).refine((data) => data.password === data.confirmPassword,{
        message: 'Confirm password do not match',
        path: ['confirmPassword']
    })
})

export const signInSchema = object({
    body: object({
        email: string().min(1,'Please enter your email').email().endsWith('@gmail.com','Email must be end with @gmail.com'),
        password: string().min(1,'Please enter your password').regex(new RegExp(patternPassword),'Password must be at 8 character(s), including 1 uppercase, 1 lowercase, 1 number and 1 special number ')
    })
})

export type signUpInput = z.infer<typeof signUpSchema>['body'];
export type signInInput = z.infer<typeof signInSchema>['body'];
