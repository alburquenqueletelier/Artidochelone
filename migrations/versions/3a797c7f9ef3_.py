"""empty message

Revision ID: 3a797c7f9ef3
Revises: 5fa586c53852
Create Date: 2022-08-19 14:29:09.281962

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3a797c7f9ef3'
down_revision = '5fa586c53852'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('profile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('photo', sa.String(length=50), nullable=True),
    sa.Column('description', sa.String(length=50), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users_comments',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('comment_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['comment_id'], ['comment.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'comment_id')
    )
    op.drop_constraint('hashtag_label_key', 'hashtag', type_='unique')
    op.drop_column('hashtag', 'count')
    op.add_column('post', sa.Column('owner_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'post', 'user', ['owner_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'post', type_='foreignkey')
    op.drop_column('post', 'owner_id')
    op.add_column('hashtag', sa.Column('count', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_unique_constraint('hashtag_label_key', 'hashtag', ['label'])
    op.drop_table('users_comments')
    op.drop_table('profile')
    # ### end Alembic commands ###
