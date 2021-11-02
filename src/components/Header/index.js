import { Link } from "react-router-dom";

import './styles.css'

function Header() {

    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/find-passengers">Find passenger</Link>
            </li>
        </ul>
    )
}

export default Header;