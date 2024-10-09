from . import user, user_type

from dependencies.database import engine


def index():
    user.Base.metadata.create_all(engine)
    user_type.Base.metadata.create_all(engine)



