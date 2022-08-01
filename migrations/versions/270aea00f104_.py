"""empty message

Revision ID: 270aea00f104
Revises: c4da3f09667e
Create Date: 2022-07-31 16:40:41.414980

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '270aea00f104'
down_revision = 'c4da3f09667e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('date_of_birth', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('last_name', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('name', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('phone_number', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('username', sa.String(length=120), nullable=False))
    op.create_unique_constraint(None, 'user', ['phone_number'])
    op.create_unique_constraint(None, 'user', ['name'])
    op.create_unique_constraint(None, 'user', ['last_name'])
    op.create_unique_constraint(None, 'user', ['username'])
    op.create_unique_constraint(None, 'user', ['date_of_birth'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='unique')
    op.drop_constraint(None, 'user', type_='unique')
    op.drop_constraint(None, 'user', type_='unique')
    op.drop_constraint(None, 'user', type_='unique')
    op.drop_constraint(None, 'user', type_='unique')
    op.drop_column('user', 'username')
    op.drop_column('user', 'phone_number')
    op.drop_column('user', 'name')
    op.drop_column('user', 'last_name')
    op.drop_column('user', 'date_of_birth')
    # ### end Alembic commands ###
