import React, {useState, useEffect} from 'react'
import { Wrapper } from './style';
import overall from '../../Data/overall'


const Home = () => {
    const [confirmedCount, setConfirmed] = useState(0);
useEffect(() => {
    setConfirmed(overall[0]["confirmedCount"])
},[])
  
    return(
        <Wrapper> 
            <h1>This site is made to be aware of COVID-19(Corona Virus).</h1>
            <h1>Confirmed Count: {confirmedCount}
            </h1>
            <h2>and counting...</h2>
            <img className="homeImg"src='https://kval.com/resources/media/49181c88-fc41-4fdd-b402-950125378c74-large16x9_coronavirus.jpg?1582939605489'alt="description of img"/>

            </Wrapper>

    )
}
export default Home;