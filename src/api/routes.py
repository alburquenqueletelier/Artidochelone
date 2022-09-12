
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Profile, Post, Comment, Hashtag
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import datetime
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import func, desc

api = Blueprint('api', __name__)

@api.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = db.session.query(User).get(id)
    if user:
        return jsonify({
            "user":user.serialize()
        })
    else:
        return jsonify({
            "message":f"Error, User ID={id} doesn't exist"
        })


@api.route('/alluser', methods=['GET'])
def list_users():

    response = dict()
    allUsers = db.session.query(User).all()
    for user in allUsers:
        response[user.username] = user.serialize()

    return jsonify({"allUsers": response}), 200

@api.route('/top10post', methods=['GET'])
def top_10_post():

    response = []
    allUsers = db.session.query(User).all()
    for user in sorted(allUsers, key=lambda x: len(x.received_comments), reverse=True):
        response.append(user)
    # for i in response:
    #     print(len(i.received_comments))
    return jsonify({"top10": [user.serialize() for user in response[:10]]}), 200

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
            expiration = datetime.timedelta(minutes=180)
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
       
@api.route('/profile/<string:username>', methods=['GET'])
def get_user_profile(username):
    user = db.session.query(User).filter_by(username=username).first()
    lista_emisores = db.session.query(User).join(Comment, Comment.receptor_id == user.id)
    # print(lista_emisores)
    if user:
        return jsonify( {
            "user": user.serialize(),
            "emisores": [emisor.serialize() for emisor in lista_emisores]
            })
    else:
        return jsonify({
            "Error": "No se encontro el usurio"
        }), 400
    ## body = request.get_json()
    ## username = body["username"]

@api.route('/profile/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = db.session.query(User).get(id)
    # lista_emisores = user.received_comments
    if user:
        lista_emisores = db.session.query(User).join(Comment, Comment.receptor_id == user.id )
        print(lista_emisores)
        # emisores_username = db.session.query(User.username).filter(User.id.in_(lista_emisores))
        return jsonify( {
            "user": user.serialize(),
            "emisores": [emisor.serialize() for emisor in lista_emisores]
            })
    else:
        return jsonify({
            "Error": "No se encontro el usurio"
        }), 400

@api.route('/post', methods=['POST'])
@jwt_required()
def post():
    
    current_user_id = get_jwt_identity()
    user_id = User.query.filter_by(username=current_user_id).first()
    body = request.get_json()
    if body["image"] and body["title"]:
        newPost = Post()
        newPost.title = body["title"]
        newPost.description = body["description"]
        newPost.image = body["image"]
        newPost.owner_id = user_id.id
        db.session.add(newPost)
        db.session.commit()
        return jsonify({
            'message': 'Post exitoso'
        }), 200
    else:
        return jsonify({
            'message': 'Error, falta imagen y/o titulo'
        }), 400

@api.route('/comment', methods=['POST'])
@jwt_required()
def comment():

    body = request.get_json()
    if body["text"] and body["emisor_id"] and body["receptor_id"]:
        newComment = Comment()
        newComment.text = body["text"]
        newComment.emisor_id = body["emisor_id"]
        newComment.receptor_id = body["receptor_id"]
        db.session.add(newComment)
        db.session.commit()
        print("Pase por http 200")
        return jsonify({
            "messeage": "Comentario creado con exito"
        }), 200
    else:
        print("Pase por http 400")
        return jsonify({
            'message': 'Error, no se creo comentario porque falta informacion (texto, emisor o receptor)'
        }), 400

@api.route('/profile/setting/<int:id>', methods=['PUT'])
@jwt_required()
def set_profile(id):

    current_username = get_jwt_identity()
    current_user = User.query.filter_by(username=current_username).first()
    if id != current_user.id:
        return jsonify({
            "Error": "You do not have permission to edit anos profile"
        }), 401
    body = request.get_json()
    profile = Profile.query.filter_by(user_id=id).first()
    anterior = {
        "image": profile.photo,
        "description": profile.description
    }
    if "image" in body:
        profile.photo = body["image"]
    if "description" in body:
        profile.description = body["description"]
    db.session.commit()
    return jsonify({
        "profile": "Update Success"
    })

   

########  Admin Controls API ######
@api.route('/admin/load/<string:model>', methods=['GET'])
@jwt_required()
def load_model(model):

    if not model in ['User','Post','Profile','Comment','Hashtag']:
        return jsonify({
            "Error":"Wrong model syntax or doesn't exist"
        })
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(username=current_user_id).first()
    if not user.is_admin:
        return jsonify({
            "Error": "You don't have access to this"
        }), 401
    info = db.session.query(eval(model)).all()
    if info:
        return jsonify({
            model:[data.serialize() for data in info]
        })
    else:
        return jsonify({
            "Empty": "Module without inputs"
        }), 404

        ### Edit <model> <id> ###
@api.route('/admin/edit/<string:model>/<int:id>', methods=['PUT'])
@jwt_required()
def edit_by_modelID(model,id):

    if not model in ['User','Post','Profile','Comment','Hashtag']:
        return jsonify({
            "Error":"Wrong model syntax or doesn't exist"
        })
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(username=current_user_id).first()
    if not user.is_admin:
        return jsonify({
            "Error": "You don't have access to this"
        }), 401
    info = db.session.query(eval(model)).get(id)
    if info:
        return jsonify({
            model:info.serialize()
        })

        ### Delete <model> <id> ###
@api.route('/admin/delete/<string:model>/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_by_modelID(model, id):

    if not model in ['User','Post','Profile','Comment','Hashtag']:
        return jsonify({
            "Error":"Wrong model syntax or doesn't exist"
        })
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(username=current_user_id).first()
    if not user.is_admin:
        return jsonify({
            "Error": "You don't have access to this"
        }), 401
    info = db.session.query(eval(model)).get(id)
    if info:
        db.session.delete(info)
        db.session.commit()
        return jsonify({
            "message": f"{model} ID={id} delete from DB"
        })
    else:
        return jsonify({
            "message": f"{model} ID={id} doesn't exist"
        })

