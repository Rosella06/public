import { Dispatch, SetStateAction } from "react"

export type contextType = {
    theme: string,
     setTheme: Dispatch<SetStateAction<string>>
}