from typing import Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    id: int
    first_name: str
    last_name: str
    age: int
    profile_picture: str


class UserCreate(BaseModel):
    first_name: str
    last_name: str
    age: int
    profile_picture: str


class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    age: Optional[int] = None
    profile_picture: Optional[str] = None


class User(UserBase):

    class ConfigDict:
        from_attributes = True