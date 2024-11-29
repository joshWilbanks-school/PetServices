
from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL, DATETIME
from dependencies.database import Base
from sqlalchemy.orm import relationship


class AnimalType(Base):
    __tablename__ = "animal_type"
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    type = Column(String(50), unique=True, nullable=False)


    