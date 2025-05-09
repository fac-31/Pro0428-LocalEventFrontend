import { Link } from "react-router"

export default function Error() {
    const heading: string = 'Error'
    return <div>
        <h1>{heading}</h1>
        <Link to='/'>Back to Homepage</Link>
    </div>
}