declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string,
        MongoURI: string,
        EMAIL_HOST: string,
        EMAIL_PORT: number,
        EMAIL_USER: string
        EMAIL_PASS: string,
        JWT_SECRET: string
        NODE_ENV: string
    }
}