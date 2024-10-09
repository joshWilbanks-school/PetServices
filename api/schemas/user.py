from typing import Optional
from pydantic import BaseModel
from schemas.user_type import UserType


class UserBase(BaseModel):
    id: int
    first_name: str
    last_name: str
    age: int
    profile_picture: str
    user_type_id: int


class UserCreate(BaseModel):
    first_name: str
    last_name: str
    age: int
    profile_picture: str
    user_type_id: int


class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    age: Optional[int] = None
    profile_picture: Optional[str] = None
    user_type_id: Optional[str] = None


class User(UserBase):
    user_type: UserType = None

    class ConfigDict:
        from_attributes = True