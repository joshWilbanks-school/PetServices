
from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL, DATETIME
from dependencies.database import Base
from sqlalchemy.orm import relationship


class Login(Base):
    __tablename__ = "login"
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    password_hash = Column(String(64), nullable=False)

    user = relationship("User")

    