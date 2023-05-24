import { useRouter } from "next/router";

const ErrorPage = () => {
    const { query } = useRouter();
    console.log(query)
    return (
        <></>
    )
}

export default ErrorPage;