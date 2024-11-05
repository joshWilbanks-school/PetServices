
from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL, DATETIME, event, DDL, Select
from dependencies.database import Base
from sqlalchemy.orm import relationship


class Review(Base):
    __tablename__ = "review"
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    customer_id = Column(Integer, ForeignKey("customer.id"), nullable=False)
    service_provider_id = Column(Integer, ForeignKey("service_provider.id"), nullable=False)
    review = Column(String(1000), nullable=True)
    rating = Column(DECIMAL(5,2), nullable=True)

    customer = relationship("Customer")
    service_provider = relationship("ServiceProvider")
    
    
insert_trigger = DDL(
    
    "CREATE TRIGGER update_rating_after_insert"
    " AFTER INSERT ON review"
    " FOR EACH ROW"
    " UPDATE service_provider AS sp SET sp.rating = (SELECT AVG(r.rating) FROM review AS r WHERE r.service_provider_id = sp.id) WHERE sp.id = NEW.service_provider_id;"
    
)

update_trigger = DDL(
    
    "CREATE TRIGGER update_rating_after_update"
    " AFTER UPDATE ON review"
    " FOR EACH ROW"
    " UPDATE service_provider AS sp SET sp.rating = (SELECT AVG(r.rating) FROM review AS r WHERE r.service_provider_id = sp.id) WHERE sp.id = NEW.service_provider_id;"
    
)


delete_trigger = DDL(
    
    "CREATE TRIGGER update_rating_after_delete"
    " AFTER DELETE ON review"
    " FOR EACH ROW"
    " UPDATE service_provider AS sp SET sp.rating = (SELECT AVG(r.rating) FROM review AS r WHERE r.service_provider_id = sp.id) WHERE sp.id = OLD.service_provider_id;"
    
)

event.listen(
    Review.__table__,
    'after_create',
    insert_trigger
)

event.listen(
    Review.__table__,
    'after_create',
    update_trigger
)


event.listen(
    Review.__table__,
    'after_create',
    delete_trigger
)