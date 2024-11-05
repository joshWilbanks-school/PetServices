import datetime
from typing import Optional
from schemas.user import User
from schemas.service_type import ServiceType
from schemas.animal_type import AnimalType
from schemas.time_measurement import TimeMeasurement
from pydantic import BaseModel


class ServiceBase(BaseModel):
    id: int
    price: float
    user_id: int
    service_type_id: int
    animal_type_id: int
    time_measurement_id: int

class ServiceCreate(BaseModel):
    user_id: int
    price: float
    service_type_id: int
    animal_type_id: int
    time_measurement_id: int


class ServiceUpdate(BaseModel):
    user_id: Optional[int]
    price: Optional[float]
    service_type_id: Optional[int]
    animal_type_id: Optional[int]
    time_measurement_id: Optional[int]


class Service(ServiceBase):
    user: User = None
    service_type: ServiceType = None
    animal_type: AnimalType = None
    time_measurement: TimeMeasurement = None

    class ConfigDict:
        from_attributes = True

        
# class Service(Base):
#     __tablename__ = "service"
#     id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
#     user_id = Column(Integer, ForeignKey("user.id"))
#     service_type_id = Column(Integer, ForeignKey("service_type.id"))
#     animal_type_id = Column(Integer, ForeignKey("animal_type.id"))
#     time_measurement_id = Column(Integer, ForeignKey("time_measurement.id"))