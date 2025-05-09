import { Link } from "react-router"

export default function SignUp() {
    let heading: string = 'SignUp'
    return <div>
        <h1>{heading}</h1>
        <Link to='/'>Back to Homepage</Link>
    </div>
}