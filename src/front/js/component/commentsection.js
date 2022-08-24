import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const CommentSection = (props) => {
    const { store, actions } = useContext(Context);
    const [commentInput, setCommentInput] = useState('');
    return (
        <div className="container-fluid glass2">
            <div className="row">
                <h2>Comments |{store.profile.received_comments.length}|</h2> 
            </div>
            {!!store.user && 
                <div className="row" id="addcomment">
                    <form onSubmit={(e)=>actions.comment(e,commentInput)}>
                        <textarea value={commentInput} className="form-control" placeholder="Comment content..." onChange={(e)=>setCommentInput(e.target.value)}></textarea><br/>
                        <button type="submit" className="btn btn-primary" >Send</button>
                    </form>
                </div>
            }
            <div className="row mt-3 comment">
                {store.profile.received_comments.length > 0 ?
                    store.profile.received_comments.map((item, index)=> {
                        return (
                            <div className="head" key={index}>
                                <small><strong className='user'>{store.received_com.find(sender=>sender.id == item.emisor).username}</strong> at {item.created}</small><br></br>
                                <p>{item.text}</p>
                            </div>    
                        )
                    })
                : <h3>No hay comentarios</h3>
                }
            </div>
        </div>
    );
};