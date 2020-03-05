import React, { useState } from 'react'
import "./styles.css";

const SelfCheck = () => {
    const [state, setState] = useState({
        cough: false,
        shortBreath: false,
        fever: false,
        musclePain: false,
        travel: false,
        tiredness: false,
        aches_or_pains: false,
        nasal_congestion: false,
        runny_nose: false,
        sore_throat: false,
        diarrhea: false
    })
    const[render, setRender] = useState([])
    const[isSubmitted, setisSubmitted] = useState(false)
    const handleChange = evt => {
        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    const handleSubmit = async e => {
        
        e.preventDefault()
        let a = Object.values(state)
        setRender(render.push(a.filter(t => t === true))
        )
        console.log(render)
    }

    return (
        <>
            <div>Symptoms may appear 2-14 days after exposure. </div>
            <br/>
            <br/>
            {!isSubmitted && 
            <form className="selfCheckButton" onSubmit={handleSubmit}>
                <br />
                <label className="container">Do you have dry cough? 
                    <input
                        type="checkbox" 
                        name="cough"
                        checked={state.cough}
                        onChange={handleChange} />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Short on Breath? 
                    <input
                        name="shortBreath"
                        type="checkbox" 
                        checked={state.shortBreath}
                        onChange={handleChange} />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Fever?
                    <input
                        name="fever"
                        type="checkbox"  
                        checked={state.fever}
                        onChange={handleChange} />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Muscle Pain?
                    <input
                        name="musclePain"
                        type="checkbox" 
                        checked={state.musclePain}
                        onChange={handleChange} />
                    <span className="checkmark"></span>
                </label>
                <label className="container">Recently traveled other countries? 
                    <input
                        name="travel"
                        type="checkbox" 
                        checked={state.travel}
                        onChange={handleChange} />
                      <span className="checkmark"></span>
                </label>
                <label className="container">Tiredness
                    <input
                        name="tiredness"
                        type="checkbox" 
                        checked={state.tiredness}
                        onChange={handleChange} />
                      <span className="checkmark"></span>
                </label>
                <label className="container">Aches or Pains
                    <input
                        name="aches_or_pains"
                        type="checkbox" 
                        checked={state.aches_or_pains}
                        onChange={handleChange} />
                      <span className="checkmark"></span>
                </label>
                <label className="container">nasal congestion
                    <input
                        name="nasal_congestion"
                        type="checkbox"
                        checked={state.nasal_congestion}
                        onChange={handleChange} />
                      <span className="checkmark"></span>
                </label>
                <label className="container">runny nose
                    <input
                        name="runny_nose"
                        type="checkbox" 
                        checked={state.runny_nose}
                        onChange={handleChange} />
                      <span className="checkmark"></span>
                </label>
                <label className="container">sore throat
                    <input
                        name="sore_throat"
                        type="checkbox" 
                        checked={state.sore_throat}
                        onChange={handleChange} />
                      <span className="checkmark"></span>
                </label>
                <label className="container">diarrhea
                    <input
                        name="diarrhea"
                        type="checkbox" 
                        checked={state.diarrhea}
                        onChange={handleChange} />
                      <span className="checkmark"></span>
                </label>
                <br />
                <br />
                <button className="checkButton" type='submit'>submit</button>
            </form>
}
{/* {isSubmitted &&

} */}
        </>
    )
}

export default SelfCheck