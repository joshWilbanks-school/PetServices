from typing import Optional
from pydantic import BaseModel
from schemas.user_type import UserType


class UserBase(BaseModel):
    id: int
<<<<<<< HEAD
=======
    user_name: str
>>>>>>> cab7b64b92abd1d4157972e429912e9b7a2a35dd
    first_name: Optional[str]
    last_name: Optional[str]
    age: Optional[int]
    profile_picture: Optional[str]
    user_type_id: int


class UserCreate(BaseModel):
    user_name: str
    first_name: Optional[str]
    last_name: Optional[str]
    age: Optional[int]
    profile_picture: Optional[str]
    user_type_id: int


class UserUpdate(BaseModel):
    user_name: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    age: Optional[int] = None
    profile_picture: Optional[str] = None
    user_type_id: Optional[str] = None


class User(UserBase):
    user_type: UserType = None

    class ConfigDict:
        from_attributes = True