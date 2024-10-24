
from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL, DATETIME
from dependencies.database import Base
from sqlalchemy.orm import relationship


class TimeMeasurement(Base):
    __tablename__ = "time_measurement"
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    type = Column(String(50), unique=True, nullable=False)


    