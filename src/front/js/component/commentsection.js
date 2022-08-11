import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";



export const CommentSection = () => {
    const { store, actions } = useContext(Context);
    return (
        <div className="container-fluid glass2">
            <div className="row">
                <h2>Comments |2| <div className="pull-right"><a href="#" id="addacomment" className="btn btn-primary">Add a coment</a> </div></h2>
            </div>
            <div className="row" id="addcomment">
                <form>
                    <textarea className="form-control" placeholder="Comment content..."></textarea><br/>
                    <button className="btn btn-primary">Send</button>
                </form>
            </div>
            <div className="row comment">
                <div className="head">
                    <small><strong className='user'>Diablo25</strong> 30.10.2017 12:13</small>
                </div>    
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non lorem elementum, accumsan magna sed, faucibus mauris. Nulla pellentesque ante nibh, ac hendrerit ante fermentum sed. Nunc in libero dictum, porta nibh pellentesque, ultrices dolor. Curabitur nunc ipsum, blandit vel aliquam id, aliquam vel velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed sit amet mi dignissim, pretium justo non, lacinia libero. Nulla facilisi. Donec id sem velit. </p>
            </div>
            <div className="row comment">
                <div className="head">
                    <small><strong className='user'>Giesche</strong> 30.10.2017 12:13</small>
                </div>    
                <p>Praesent molestie ante nec metus convallis aliquam. Ut aliquam tincidunt mollis. Maecenas et ex sit amet est vehicula ultrices sed sit amet elit. Suspendisse potenti. Aenean et quam ut purus convallis porttitor. Mauris porttitor pretium elementum. Duis blandit elit tincidunt ipsum ultricies, ut faucibus lorem facilisis. Proin ipsum turpis, pharetra in lorem ac, porta ullamcorper velit. Proin gravida odio eget elit ultricies sodales. Vivamus vel tincidunt ligula. Proin pulvinar pellentesque velit eget luctus. Aliquam vitae enim ut purus vestibulum sollicitudin sit amet eget lacus. Nunc tempus fringilla tincidunt. </p>
            </div>
        </div>
    );
};