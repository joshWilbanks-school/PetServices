import datetime
from typing import Optional
from schemas.customer import Customer
from schemas.service_provider import ServiceProvider
from pydantic import BaseModel


class ReviewBase(BaseModel):
    id: int
    customer_id: int
    service_provider_id: int
    review: str
    rating: float

class ReviewCreate(BaseModel):
    customer_id: int
    service_provider_id: int
    review: Optional[str] = None
    rating: Optional[float] = None


class ReviewUpdate(BaseModel):
    customer_id: Optional[int] = None
    service_provider_id: Optional[int] = None
    review: Optional[str] = None
    rating: Optional[float] = None



class Review(ReviewBase):
    customer: Customer = None
    service_provider: ServiceProvider = None

    class ConfigDict:
        from_attributes = True

    
# __tablename__ = "review"
# id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
# customer_id = Column(Integer, ForeignKey("customer.id"), nullable=False)
# service_provider_id = Column(Integer, ForeignKey("service_provider.id"), nullable=False)
# review = Column(String(1000), nullable=True)
# rating = Column(DECIMAL(5,2), nullable=True)
