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
                    <li key={0}>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li key={1}>
                        <Link to="/countrylist">
                            Countries
                        </Link>
                    </li>
                    <li key={2}>
                        <Link to="/map">
                            View Map
                        </Link>
                    </li>
                    <li key={3}>
                        <Link to="/communication">
                        communication
                        </Link>
                    </li>
                    <li key={4}>
                        <Link to="/selfcheck">
                        Self Check
                        </Link>
                    </li>

                    {isLoggedIn ?
                        <>
                            <li key={5}>
                                <Link to="/"
                                    style={{ cursor: 'pointer' }} onClick={logoutUser} >LOGOUT
                                    </Link>
                            </li>
                            <span>Hello {currentUser.email} </span>
                        </>
                        :
                        <>
                            <li key={6}>
                                <Link to="/login">
                                    Login
                        </Link>
                            </li>
                            <li key={7}>
                                <Link to="/signup">
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
