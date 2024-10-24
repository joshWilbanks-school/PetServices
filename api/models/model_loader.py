from . import user, user_type, service_provider, customer, review

from dependencies.database import engine


def index():
    user.Base.metadata.create_all(engine)
    user_type.Base.metadata.create_all(engine)
    service_provider.Base.metadata.create_all(engine)
    customer.Base.metadata.create_all(engine)
    review.Base.metadata.create_all(engine)




