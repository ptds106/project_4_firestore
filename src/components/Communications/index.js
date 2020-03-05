import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Firebase from '../Firebase/firebase'

const Communications = () => {
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
                timestamp: Firebase.app.firestore.FieldValue.serverTimestamp(),
                articles: content,
                title,

            })
    };

    return (
        <>
            <h1>hello</h1>
            {article.map((ele) => (
                <h1 key={ele.id}> {ele.articles}</h1>
            ))}
            <Link exact to='/showarticle'>addd</Link>
        </>
    );
};
export default Communications