
from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL, DATETIME
from dependencies.database import Base
from sqlalchemy.orm import relationship


class Service(Base):
    __tablename__ = "service"
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    price = Column(DECIMAL(5,2), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"))
    service_type_id = Column(Integer, ForeignKey("service_type.id"))
    animal_type_id = Column(Integer, ForeignKey("animal_type.id"))
    time_measurement_id = Column(Integer, ForeignKey("time_measurement.id"))

    user = relationship("User")
    service_type = relationship("ServiceType")
    animal_type = relationship("AnimalType")
    time_measurement = relationship("TimeMeasurement")
    