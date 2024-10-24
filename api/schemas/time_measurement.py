import datetime
from typing import Optional
from schemas.user import User
from pydantic import BaseModel


class TimeMeasurementBase(BaseModel):
    id: int
    type: str

class TimeMeasurementCreate(BaseModel):
    type: str


class TimeMeasurementUpdate(BaseModel):
    type: Optional[str]


class TimeMeasurement(TimeMeasurementBase):
    pass

    class ConfigDict:
        from_attributes = True