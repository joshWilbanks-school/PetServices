import datetime
from typing import Optional
from pydantic import BaseModel


class UserTypeBase(BaseModel):
    id: int
    type: str

class UserTypeCreate(BaseModel):
    type: str

class UserTypeUpdate(BaseModel):
    type: str


class UserType(UserTypeBase):
    pass

    class ConfigDict:
        from_attributes = True