from routers import (user, user_type)


def load_routes(app):
    app.include_router(user.router)
    app.include_router(user_type.router)


