import datetime
from typing import Optional
from schemas.user import User
from schemas.animal_type import AnimalType
from pydantic import BaseModel


class PetBase(BaseModel):
    id: int
    user_id: int
    animal_type_id: int
    name: str
    picture: str

class PetCreate(BaseModel):
    user_id: int
    animal_type_id: int
    name: str
    picture: str



class PetUpdate(BaseModel):
    user_id: Optional[int] = None
    animal_type_id: Optional[int] = None
    name: Optional[str] = None
    picture: Optional[str] = None



class Pet(PetBase):
    user: User = None
    animal_type: AnimalType = None

    class ConfigDict:
        from_attributes = True