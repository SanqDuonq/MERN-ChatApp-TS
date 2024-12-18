import { LoaderCircleIcon } from "lucide-react"

export const ButtonComponent = ({name,isLoading}: {name:string,isLoading:boolean}) => {
    return (
        <button
            className="btn btn-primary text-white w-full"
            disabled={isLoading}
        >
            {isLoading ? (
                <div className="flex items-center gap-x-[10px] ">
                    <LoaderCircleIcon className=" animate-spin "/>
                    Loading...
                </div>
            ) : (
                name
            )}
        </button>
    )
}