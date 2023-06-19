"""initial-migration

Revision ID: 61abcda435f7
Revises: 
Create Date: 2023-06-19 16:13:02.440591

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")



# revision identifiers, used by Alembic.
revision = '61abcda435f7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False, unique=True),
    sa.Column('email', sa.String(length=255), nullable=False, unique=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('recipes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('protein_type', sa.Text(), nullable=True),
    sa.Column('steps', sa.Text(), nullable=False),
    sa.Column('ingredients', sa.Text(), nullable=False),
    sa.Column('prep_time', sa.String(length=255), nullable=False),
    sa.Column('cook_time', sa.String(length=255), nullable=False),
    sa.Column('steps_link', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=500), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('recipe_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE recipes SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE recipe_images SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###



def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('recipe_images')
    op.drop_table('comments')
    op.drop_table('recipes')
    op.drop_table('users')
    # ### end Alembic commands ###