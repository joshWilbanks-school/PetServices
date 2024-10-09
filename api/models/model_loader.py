from . import user

from dependencies.database import engine


def index():
    user.Base.metadata.create_all(engine)
    




