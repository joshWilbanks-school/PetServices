
from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL, DATETIME
from dependencies.database import Base
from sqlalchemy.orm import relationship


class Pet(Base):
    __tablename__ = "pet"
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    animal_type_id = Column(Integer, ForeignKey("animal_type.id"), nullable=False)
    picture = Column(String(16000), nullable=True)
    name = Column(String(100), nullable=True)


    user = relationship("User")
    animal_type = relationship("AnimalType")

    