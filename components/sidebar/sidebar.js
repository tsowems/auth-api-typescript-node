import Link from 'next/link'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { getAuthorized } from '../../actions/integrations';

const Sidebar = () => {

    const handleClick = () => {
        getAuthorized()
    }

    return (

        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>Finsweet User</h3>
            </div>

            <ul className="list-unstyled components">

                {/* <li className="active">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
                    <ul className="collapse list-unstyled" id="homeSubmenu">
                        <li>
                            <a href="#">Home 1</a>
                        </li>
                        <li>
                            <a href="#">Home 2</a>
                        </li>
                        <li>
                            <a href="#">Home 3</a>
                        </li>
                    </ul>
                </li> */}
                <li>
                    <React.Fragment>
                        <NavItem>
                            <Link href="/user">
                                <NavLink>Dashboard</NavLink>
                            </Link>
                        </NavItem>
                    </React.Fragment>

                </li>

                <li>
                    <React.Fragment>
                        <NavItem>
                            <Link href="/user/integration/integrationlist">
                                <NavLink>Integrations</NavLink>
                            </Link>
                        </NavItem>
                    </React.Fragment>

                </li>
                <li>
                    <React.Fragment>
                        <NavItem>
                            <Link href="/" >
                                <a onClick={(e) => handleClick()} href={`getAuthorized`}>Create Integration</a>
                            </Link>
                        </NavItem>
                    </React.Fragment>

                </li>
                {/* <li>
                    <React.Fragment>
                        <NavItem>
                            <Link href="/user/profile">
                                <NavLink>Profile</NavLink>
                            </Link>
                        </NavItem>
                    </React.Fragment>

                </li> */}
                {/* <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
                    <ul className="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <a href="#">Page 1</a>
                        </li>
                        <li>
                            <a href="#">Page 2</a>
                        </li>
                        <li>
                            <a href="#">Page 3</a>
                        </li>
                    </ul>
                </li> */}
                {/* <li>
                    <a href="#">Portfolio</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li> */}
            </ul>

            <ul className="list-unstyled CTAs">
                <li>
                    <a href="" className="download"></a>
                </li>
                <li>
                    <a href="" className="article"></a>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;