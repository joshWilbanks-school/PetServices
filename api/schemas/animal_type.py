import datetime
from typing import Optional
from schemas.user import User
from pydantic import BaseModel


class AnimalTypeBase(BaseModel):
    id: int
    type: str

class AnimalTypeCreate(BaseModel):
    type: str


class AnimalTypeUpdate(BaseModel):
    type: Optional[str]


class AnimalType(AnimalTypeBase):
    pass

    class ConfigDict:
        from_attributes = True