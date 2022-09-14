import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const CommentSection = (props) => {
    const { store, actions } = useContext(Context);
    const [commentInput, setCommentInput] = useState('');
    return (
        <div className="row glass2">

            <div className="col px-5 input-text">
                <h2> ¿Te gusta mi trabajo? Hablemos!
                </h2>
                {!!store.user &&
                    <div className="" id="addcomment">
                        <form onSubmit={(e) => actions.comment(e, commentInput)}>
                            <textarea value={commentInput} className="form-control" placeholder="Tu mensaje aquí.." onChange={(e) => setCommentInput(e.target.value)}></textarea><br />
                            <button type="submit" className="btn btn-primary" >Enviar</button>
                        </form>
                    </div>
                } 
            </div>


            <div className="col p-5 align-items-center comment">
                {store.profile.received_comments.length > 0 ?
                    store.profile.received_comments.map((item, index) => {
                        return (
                            <div className="head bg-light" key={index}>
                                <p>{item.text}</p>
                                <strong className='user'>Enviado por {store.received_com.find(sender => sender.id == item.emisor).username}</strong> at {item.created}<br></br>
                                
                            </div>
                        )
                    })
                    : <h3>
                        {/* {store.profile.received_comments.length} mensajes  */}
                    </h3>
                }
            </div>
        </div>
    );
};

/*

            <div className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}>
                <div className="container">
                    <div className="row home__hero-row"
                        style={{ display: 'flex', flexDirection: imgStart === 'start' ? 'row-reverse' : 'row' }}
                    >
                        <div className="col">
                            <div className="home__hero-text-wrapper">
                                <h1 className={lightText ? 'heading' : 'heading dark'}>{headline}</h1>
                                <p className={lightTextDesc ? 'subtitle' : 'subtitle dark'}>{description}</p>

                            </div>
                        </div>


                        <div className="col">
                            <div className="home__hero-img-wrapper">
                                <Link to='/sign-up'>
                                    <Button buttonSize='btn--wide' buttonColor={'blue'}>
                                        {buttonLabel}
                                    </Button>
                                </Link>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

*/ 