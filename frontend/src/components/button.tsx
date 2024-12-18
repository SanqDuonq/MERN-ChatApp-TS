import { LoaderCircleIcon } from "lucide-react"

export const ButtonComponent = ({name,isLoading}: {name:string,isLoading:boolean}) => {
    return (
        <button
            className=" btn btn-primary w-full"
            disabled={isLoading}
        >
            {isLoading ? (
                <div>
                    <LoaderCircleIcon className=" animate-spin " />
                    Loading...
                </div>
            ) : (
                name
            )
            }
        </button>
    )
}