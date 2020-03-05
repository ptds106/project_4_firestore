import React, { useState, useEffect } from 'react'
import Firebase from '../Firebase/firebase'
import {Redirect} from 'react-router-dom'
const ShowArticle = () => {
    const [article, setArticle] = useState([]);
    const [input, setInput] = useState({})
    useEffect(() => {
        Firebase.database
            .collection('communications')
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => {
                const article = snapshot.docs.map(art => ({

                    id: art.id,
                    ...art.data()
                }))
                return setArticle(article)
            })
    }, [])

    const handleChange = e => {
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        const { title, content } = input
        e.preventDefault();
        Firebase.database.collection('communications')
            .add({
                timestamp: Firebase.time,
                articles: content,
                title,
            })
            .catch((error) =>{
                console.log("Tanner~")
            })
            return <Redirect to='/communication'/>
    };

    return (
        <>
            <h1>hello</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Add title:
             <input name="title" onChange={handleChange} type='text' />
                </label>
                <br />
                <br />
                <br />
                <label>
                    Add article:
                <br />
                    <textarea name="content" onChange={handleChange} rows="20" cols="150" />
                </label><br />
                <button type="'submit">Submit</button>
            </form>
        </>
    );
};
export default ShowArticle