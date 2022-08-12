import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const CommentSection = (props) => {
    const { store, actions } = useContext(Context);
    const [commentInput, setCommentInput] = useState('');
    return (
        <div className="container-fluid glass2">
            <div className="row">
                <h2>Comments |{store.demo?.comments.filter(comment=>comment.receptor_id == props.userID).length}|</h2> 
            </div>
            {!!store.user && 
                <div className="row" id="addcomment">
                    <form>
                        <textarea value={commentInput} className="form-control" placeholder="Comment content..." onChange={(e)=>setCommentInput(e.target.value)}></textarea><br/>
                        <button type="submit" className="btn btn-primary" onClick={(e)=>actions.comment(e,commentInput, props.userID)}>Send</button>
                    </form>
                </div>
            }
            <div className="row comment">
                {store.demo.comments.filter(comment=>comment.receptor_id == props.userID).length > 0 ?
                    store.demo.comments.filter(comment=>comment.receptor_id == props.userID).map((item, index)=> {
                        return (
                            <div className="head" key={index}>
                                <small><strong className='user'>{store.demo?.users.filter(user => user.id == item.emisor_id).map(user=>user.username)}</strong> Date: {item.created}</small><br></br>
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