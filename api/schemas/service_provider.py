import datetime
from typing import Optional
from schemas.user import User, UserCreate
from schemas import user
from pydantic import BaseModel


class ServiceProviderBase(BaseModel):
    id: int
    user_id: int
    rating: float
    title: Optional[str]

class ServiceProviderCreate(BaseModel):
    user_id: int
    title: str


class ServiceProviderUpdate(BaseModel):
    user_id: Optional[int] = None
    rating: Optional[float] = None
    title: Optional[str] = None

class ServiceProviderCreateWithUser(user.UserCreate):
    user_id: int
    title: str


class ServiceProvider(ServiceProviderBase):
    user: User = None

    class ConfigDict:
        from_attributes = True