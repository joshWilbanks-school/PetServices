from routers import (user, user_type, service_provider)


def load_routes(app):
    app.include_router(user.router)
    app.include_router(user_type.router)
    app.include_router(service_provider.router)


