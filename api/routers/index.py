from routers import (user, user_type, service_provider, customer, review, time_measurement, service_type, animal_type, service, data, pet)


def load_routes(app):
    app.include_router(user.router)
    app.include_router(user_type.router)
    app.include_router(service_provider.router)
    app.include_router(customer.router)
    app.include_router(review.router)
    app.include_router(time_measurement.router)
    app.include_router(service_type.router)
    app.include_router(animal_type.router)
    app.include_router(service.router)
    app.include_router(data.router)
    app.include_router(pet.router)

