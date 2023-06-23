"""changing nullable on recipeimages

Revision ID: 90bbbec5a844
Revises: 8e1eb79a9ec3
Create Date: 2023-06-22 20:12:35.750742

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '90bbbec5a844'
down_revision = '8e1eb79a9ec3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recipe_images', schema=None) as batch_op:
        batch_op.alter_column('recipe_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recipe_images', schema=None) as batch_op:
        batch_op.alter_column('recipe_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###