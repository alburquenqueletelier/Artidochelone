
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Profile, Post, Comment, Hashtag
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import datetime
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/alluser', methods=['GET'])
def list_users():

    response = dict()
    allUsers = db.session.query(User).all()
    for user in allUsers:
        response[user.username] = user.serialize()

    return jsonify({"allUsers": response}), 200

@api.route('/login', methods=['POST'])
def login():
    #recibo informacion de la solicitud (fetch)
    body = request.get_json()
    username = body["username"]
    password = body["password"]
    #checkear si el usuario existe
    user = db.session.query(User).filter_by(username=username).first()
    if user: #si el resultado de user es diferente a None
        if user.password == body["password"]:
            #usuario y clave correcto
            #el token tendrá un tiempo de vida dependiendo de los minutos indicados
            expiration = datetime.timedelta(minutes=30)
            access_token = create_access_token(identity=user.username, expires_delta=expiration)
            print("usuario autenticado")
            return jsonify({
                "message": "logued in",
                "user": user.serialize(),
                "expire_seconds": expiration.total_seconds(),
                "token": access_token
            })
        else:
            print("usuario o clave no validos")
            return jsonify({
                "message": "wrong user or password"
            })
    return jsonify({
        "message": "unable to login"
    })


@api.route('/register', methods=['POST'])
def register():
    decoded_object = json.loads(request.data)
    check_email = User.query.filter_by(email=decoded_object["email"]).all()
    if check_email:
        return jsonify({
        "message": "Email already in use"
    }) 
    check_username = User.query.filter_by(username=decoded_object["username"]).all()
    if check_username:
        return jsonify({
        "message": "Username already in use"
    })
    new_user = User()
    new_user.name = decoded_object["name"]
    new_user.lastname = decoded_object["lastname"]
    new_user.username = decoded_object["username"]
    new_user.email = decoded_object["email"]
    new_user.password = decoded_object["password"]
    new_profile = Profile()
    new_profile.name = decoded_object["name"]
    new_user.profile = new_profile
    db.session.add_all([new_profile, new_user ])
    db.session.commit()
    return jsonify({
        "message": "New user created :D"
    })

# @api.route('/profile', methods=['POST', 'GET'])
# @jwt_required()
# def profile():
#     get_token = get_jwt_identity()
#     user = db.session.query(User).filter_by(username=get_token).first()
#     profile = db.session.query(Profile).filter_by(user_id=user.id).first()
#     if user:
#         return jsonify( {
#             "user" : user.serialize()
#             } )
    ## body = request.get_json()
    ## username = body["username"]
       
@api.route('/profile/<string:username>', methods=['POST', 'GET'])
def get_user_profile(username):
    user = db.session.query(User).filter_by(username=username).first()
    if user:
        return jsonify( user.serialize() )
    else:
        return jsonify({
            "Error": "No se encontro el usurio"
        }), 400
    ## body = request.get_json()
    ## username = body["username"]

@api.route('/post', methods=['POST'])
@jwt_required()
def post():

    body = request.get_json()
    if body["image"] and body["title"]:
        newPost = Post()
        newPost.title = body["title"]
        newPost.description = body["description"]
        newPost.image = body["image"]
        db.session.add(newPost)
        db.session.commit()
        return jsonify({
            'message': 'Post exitoso'
        }), 200
    else:
        return jsonify({
            'message': 'Error, falta imagen y/o titulo'
        }), 400