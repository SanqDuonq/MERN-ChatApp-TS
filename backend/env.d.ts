declare namespace NodeJS {
    interface ProcessEnv {
        MongoURI: string,
        EMAIL_HOST: string,
        EMAIL_PORT: number,
        EMAIL_USER: string
        EMAIL_PASS: string
    }
}