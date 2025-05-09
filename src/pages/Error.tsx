import { Link } from "react-router"

export default function Error() {
    let heading: string = 'Error'
    return <div>
        <h1>{heading}</h1>
        <Link to='/'>Back to Homepage</Link>
    </div>
}