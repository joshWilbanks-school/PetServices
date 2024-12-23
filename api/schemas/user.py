from typing import Optional
from pydantic import BaseModel
from schemas.user_type import UserType


class UserBase(BaseModel):
    id: int
    user_name: str
    first_name: Optional[str]
    last_name: Optional[str]
    age: Optional[int]
    profile_picture: Optional[str]
    user_type_id: int
    biography: Optional[str]
    contact_info: Optional[str]


class UserCreate(BaseModel):
    user_name: str
    first_name: Optional[str]
    last_name: Optional[str]
    age: Optional[int]
    profile_picture: Optional[str]
    user_type_id: int
    biography: Optional[str]
    contact_info: Optional[str]


class UserUpdate(BaseModel):
    user_name: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    age: Optional[int] = None
    profile_picture: Optional[str] = None
    user_type_id: Optional[int] = None
    biography: Optional[str] = None
    contact_info: Optional[str] = None


class User(UserBase):
    user_type: UserType = None

    class ConfigDict:
        from_attributes = True