interface IUser {
    id: string,
    email:string,
    profilePicture: string,
    user: {
        isVerify: boolean
    },
}

export default IUser;