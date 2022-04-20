import './CreatePoll.css'
import {PollItem} from '../Components/PollItem'
import PillBody from '../Components/Pill-Body'
import { useState,useEffect } from 'react'

const axios = require('axios').default;

const ax_instance = axios.create({
    baseURL: 'http://localhost:8000',
});




const CreatePoll = () =>{
    const [topics,setTopics] = useState(["",""])
    const [title,setTitle] = useState("Poll Title")

    const updateText = (id,text) =>{
        let newTopics = [...topics]
        newTopics[id] = text
        setTopics(newTopics)
        console.log(topics)
    }
    const updateTopics = (add) =>{
        if(add === true){
        let newTopics = [...topics]
        newTopics.push("")
        setTopics(newTopics)
        }
        else if(topics.length > 2){
        let newTopics = [...topics]
        newTopics.pop()
        setTopics(newTopics)
        }
    }

    const SendPoll = async () =>{
        const json = JSON.stringify({"Title":title,"Options": topics})
        console.log(json)
        await ax_instance.post(`/createpoll`,json,{
        headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json'
            }  
        })
        .then(Response=>{
            this.props.history.push('/dashboard')
        })
    }
    return(
        
            <PillBody>
                <div className="poll-title">
                        <input type="text" defaultValue={title} onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div className="options">
                        {topics.map((Number,index)=>{
                        return (<PollItem key={index} id={index} placeHold={`Option ${index+1}`} updateText={updateText}/>)
                    })}
                    </div>
                    <div className="button-holder">
                        <button onClick={()=>updateTopics(true)}>Add Choice</button>
                        <button onClick={()=>updateTopics(false)} >Remove Choice</button>
                        <button onClick={()=>SendPoll()}>Create Poll</button>
                    </div>
            </PillBody>
                
    )
}

export default CreatePoll;