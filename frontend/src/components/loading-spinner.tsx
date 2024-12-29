import { LoaderCircle } from "lucide-react"

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <LoaderCircle className="size-10 animate-spin text-blue-500" />
        </div>
    )
}

export default LoadingSpinner;