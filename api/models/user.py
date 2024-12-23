
from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL, DATETIME
from dependencies.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    user_name = Column(String(25), nullable=False)
    first_name = Column(String(25), nullable=True)
    last_name = Column(String(25), nullable=True)
    age = Column(Integer, nullable=True)
    profile_picture = Column(String(12000), nullable=True)
    user_type_id = Column(Integer, ForeignKey("user_type.id"), nullable=False,)
    biography = Column(String(1500), nullable=True)
    contact_info = Column(String(50), nullable=True)

    user_type = relationship("UserType")
    