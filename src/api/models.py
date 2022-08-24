from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    lastname = db.Column(db.String(50), unique=False, nullable=False)
    username = db.Column(db.String(60), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    profile = db.relationship('Profile', lazy='select', uselist=False,
        backref=db.backref('user', lazy='joined'))
    posts = db.relationship('Post', lazy='select',
        backref=db.backref('user', lazy='joined'))
    send_comments = db.relationship('Comment', lazy='select', foreign_keys='[Comment.emisor_id]',
        backref=db.backref('emisor', lazy='joined'))
    # received_comments_id = db.Column(db.Integer, db.ForeignKey('comment.id'))
    received_comments = db.relationship("Comment", post_update=True, backref=db.backref('receptor', lazy='joined'),
                                  foreign_keys='[Comment.receptor_id]')
    #is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    #is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    #created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    def __repr__(self):
        return f'<User {self.username} ID={self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "username": self.username,
            "email": self.email,
            "posts": [post.serialize() for post in self.posts] if self.posts else [],
            "profile": self.profile.serialize() if self.profile else [],
            "received_comments": [comment.serialize() for comment in self.received_comments] if self.received_comments else [],
            #"admin": self.is_admin,
            #"created": self.created
            # do not serialize the password, its a security breach
        }

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    photo = db.Column(db.String(50), unique=False, nullable=True)
    description = db.Column(db.String(50), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = True)

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "photo": self.photo,
            "description": self.description
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image = db.Column(db.String(), nullable=False)
    created = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    owner_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)

    def __repr__(self):
        return f'<Title={self.title} owner={self.owner_id if self.owner_id else "NN"}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "image": self.image,
            "created": self.created
        }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text)
    created = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    # emisor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    # receptor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    # emisor = db.relationship("User", foreign_keys=[emisor_id])
    # receptor = db.relationship("User", foreign_keys=[receptor_id])
    emisor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    receptor_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return f'Emisor={self.emisor_id} Receptor={self.receptor_id} date={self.created}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "created": self.created,
            "emisor": self.emisor_id,
            "receptor": self.receptor_id
        }

class Hashtag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(50), unique=False, nullable=False)
    created = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'<#{self.label}>'

    def serialize(self):
        return {
            "id": self.id,
            "label": self.label,
            "created": self.created
        }
