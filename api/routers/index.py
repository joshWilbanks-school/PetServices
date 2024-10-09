from routers import (user, user_type, service_provider, customer)


def load_routes(app):
    app.include_router(user.router)
    app.include_router(user_type.router)
    app.include_router(service_provider.router)
    app.include_router(customer.router)


