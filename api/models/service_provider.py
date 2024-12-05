
from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL, DATETIME, DDL, event
from dependencies.database import Base
from sqlalchemy.orm import relationship



class ServiceProvider(Base):
    __tablename__ = "service_provider"
    id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    rating = Column(DECIMAL(5,2), nullable=True)
    title = Column(String(25), nullable=True)

    user = relationship("User")

