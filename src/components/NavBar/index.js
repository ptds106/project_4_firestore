import React from 'react'
import { Link } from 'react-router-dom';
import Firebase from '../Firebase/firebase'
import { Wrapper } from './style';

const NavBar = ({ isLoggedIn, currentUser, doSetCurrentUser }) => {
    const logoutUser = async () => {
        try {
            await Firebase.doSignOut()
            doSetCurrentUser(null)
        } catch (error) {
            console.log("maerong")
        }
    }
    return (
        <>
            <Wrapper>
                <ul>
                    <li>
                        <Link exact to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/countrylist">
                            Countries
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/map">
                            View Map
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/communication">
                        communication
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/selfcheck">
                        Self Check
                        </Link>
                    </li>

                    {isLoggedIn ?
                        <>
                            <li>
                                <Link exact to="/"
                                    style={{ cursor: 'pointer' }} onClick={logoutUser} >LOGOUT
                                    </Link>
                            </li>
                            <span>Hello {currentUser.email} </span>
                        </>
                        :
                        <>
                            <li>
                                <Link exact to="/login">
                                    Login
                        </Link>
                            </li>
                            <li>
                                <Link exact to="/signup">
                                    SignUp
                        </Link>
                            </li>
                        </>
                    }
                </ul>
            </Wrapper >
        </>
    )
}
export default NavBar
