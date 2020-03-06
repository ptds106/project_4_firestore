import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import "./styles.css";
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
    // const doDeletePost = async post => {
    //     e.preventDefault()
    //     try{
    //         Firebase.database.collection("communications").doc(post).delete()
    //     }
        


    return (
        <>
            <h1>hello</h1>
            <ul>
            {article.map((ele) => (
                <li className="lili" key={ele.id}> {ele.articles}</li>
            ))}
            </ul>
            <Link exact to='/showarticle'>addd</Link>
            {/* <Link to= `/communications/delete/${doc.id}`> Delete Post</Link> */}
        </>
    );
};
export default Communications