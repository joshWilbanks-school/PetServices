
from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL, DATETIME
from dependencies.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    first_name = Column(String(25), nullable=False)
    last_name = Column(String(25), nullable=False)
    age = Column(Integer, nullable=True)
    profile_picture = Column(String(16000), nullable=True)
    user_type_id = Column(Integer, ForeignKey("user_type.id"), nullable=False,)

    user_type = relationship("UserType")
    