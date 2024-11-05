
from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL, DATETIME, DDL, event
from dependencies.database import Base
from sqlalchemy.orm import relationship



class ServiceProvider(Base):
    __tablename__ = "service_provider"
    id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    rating = Column(DECIMAL(5,2), nullable=True)
    title = Column(String(25), nullable=True)
    biography = Column(String(300), nullable=True)

    user = relationship("User")


# @event.listens_for(review.Review.__table__, 'after_create')
# def receive_after_create(target, connection, **kw):
#     connection.execute(
#     "CREATE TRIGGER update_rating_after_insert"
#     "AFTER INSERT ON review"
#     "FOR EACH ROW"
#     "UPDATE service_provider AS sp SET sp.rating = (SELECT AVG(r.rating) FROM review AS r WHERE r.service_provider_id = sp.id) WHERE sp.id = NEW.service_provider_id;"
#     )

# trigger = DDL(
#     '''
#     CREATE TRIGGER update_rating_after_insert
#     AFTER INSERT ON review
#     FOR EACH ROW
#     UPDATE service_provider AS sp SET sp.rating = (SELECT AVG(r.rating) FROM review AS r WHERE r.service_provider_id = sp.id) WHERE sp.id = NEW.service_provider_id;
#     '''
# )



# event.listen(
#     review.Review.__tablename__,
#     'after_create',
#     trigger.execute_if(dialect='postgresql')
# )