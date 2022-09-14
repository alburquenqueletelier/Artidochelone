import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/commentSection.css'

export const CommentSection = (props) => {
    const { store, actions } = useContext(Context);
    const [commentInput, setCommentInput] = useState('');
    return (
        <div className="row glass2 commentSection">

            <div className="row p-5 input-text">
                <h2 className="px-5"> ¿Te gusta mi trabajo?</h2>
                
                {!!store.user &&
                    <div className="d-flex row pt-5 align-items-center" id="addcomment">
                        <form onSubmit={(e) => actions.comment(e, commentInput)} className=' form-comment'>
                            <textarea value={commentInput} className="form-control form-commentSection" placeholder="Deja tu mensaje aquí!" onChange={(e) => setCommentInput(e.target.value)}></textarea><br />
                            <button type="submit" className="btn blue btn-comment" >Enviar</button>
                        </form>
                    </div>
                }
            </div>


            <div className="row p-5 align-items-center comment">
                <h2 className="px-5 pb-5"> Comentarios recibidos</h2>
                 {store.profile.received_comments.length > 0 ?
                    store.profile.received_comments.map((item, index) => {
                        return (
                            <div className="head pb-5 bg-light form-control" key={index}>
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