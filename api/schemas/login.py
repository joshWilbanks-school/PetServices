import datetime
from typing import Optional
from schemas.user import User
from pydantic import BaseModel


class LoginBase(BaseModel):
    id: int
    user_id: int
    password_hash: str

class LoginCreate(BaseModel):
    user_id: int
    password_hash: str


class LoginUpdate(BaseModel):
    user_id: Optional[int] = None
    password_hash: Optional[str]


class Login(LoginBase):
    user: User = None

    class ConfigDict:
        from_attributes = True