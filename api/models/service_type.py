
from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL, DATETIME
from dependencies.database import Base
from sqlalchemy.orm import relationship


class ServiceType(Base):
    __tablename__ = "service_type"
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    type = Column(String(50), unique=True, nullable=False)


    