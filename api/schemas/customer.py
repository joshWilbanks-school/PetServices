import datetime
from typing import Optional
from schemas.user import User
from pydantic import BaseModel


class CustomerBase(BaseModel):
    id: int
    user_id: int

class CustomerCreate(BaseModel):
    user_id: int


class CustomerUpdate(BaseModel):
    user_id: Optional[int] = None


class Customer(CustomerBase):
    user: User = None

    class ConfigDict:
        from_attributes = True