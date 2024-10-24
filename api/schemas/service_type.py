import datetime
from typing import Optional
from schemas.user import User
from pydantic import BaseModel


class ServiceTypeBase(BaseModel):
    id: int
    type: str

class ServiceTypeCreate(BaseModel):
    type: str


class ServiceTypeUpdate(BaseModel):
    type: Optional[str]


class ServiceType(ServiceTypeBase):
    pass

    class ConfigDict:
        from_attributes = True