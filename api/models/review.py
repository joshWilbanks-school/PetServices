
from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL, DATETIME
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
    