
from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL, DATETIME
from dependencies.database import Base


class UserType(Base):
    __tablename__ = "user_type"
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    type = Column(String(30), nullable=False, unique=True)
    