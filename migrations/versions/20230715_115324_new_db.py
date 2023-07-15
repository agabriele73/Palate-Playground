"""new db

Revision ID: 8df75dda9fd9
Revises: 
Create Date: 2023-07-15 11:53:24.741412

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '8df75dda9fd9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
    sa.Column('username', sa.String(length=40), nullable=False, unique=True),
    sa.Column('email', sa.String(length=255), nullable=False, unique=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('recipes',
    sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('protein_type', sa.String(length=50), nullable=True),
    sa.Column('steps', sa.Text(), nullable=False),
    sa.Column('ingredients', sa.Text(), nullable=False),
    sa.Column('prep_time', sa.String(length=50), nullable=False),
    sa.Column('cook_time', sa.String(length=50), nullable=False),
    sa.Column('steps_link', sa.String(length=125), nullable=False),
    sa.Column('image_url', sa.String(length=250), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], name='fk_recipe_owner_id_users', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
    sa.Column('comment', sa.String(length=500), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('recipe_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], name='fk_comment_recipe_id_recipes', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_comment_user_id_users', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
    sa.Column('fave', sa.Boolean(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('recipe_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], name='fk_favorite_recipe_id_recipes', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_favorite_user_id_users', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )


    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE recipes SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorites')
    op.drop_table('comments')
    op.drop_table('recipes')
    op.drop_table('users')
    # ### end Alembic commands ###