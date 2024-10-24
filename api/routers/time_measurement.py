from fastapi import APIRouter, Depends, FastAPI, status, Response
from sqlalchemy.orm import Session
from controllers import time_measurement as controller
from schemas import time_measurement as schema
from dependencies.database import engine, get_db

router = APIRouter(
    tags=['TimeMeasurement'],
    prefix="/time_measurement"
)


@router.post("/", response_model=schema.TimeMeasurement)
def create(request: schema.TimeMeasurementCreate, db: Session = Depends(get_db)):
    time_measurement: schema.TimeMeasurement =  controller.create(db=db, request=request)
    return time_measurement


@router.get("/", response_model=list[schema.TimeMeasurement])
def read_all(db: Session = Depends(get_db)):
    return controller.read_all(db)


@router.get("/{time_measurement_id}", response_model=schema.TimeMeasurement)
def read_one(time_measurement_id: int, db: Session = Depends(get_db)):
    return controller.read_one(db, time_measurement_id=time_measurement_id)


@router.put("/{time_measurement_id}", response_model=schema.TimeMeasurement)
def update(time_measurement_id: int, request: schema.TimeMeasurementUpdate, db: Session = Depends(get_db)):
    return controller.update(db=db, request=request, time_measurement_id=time_measurement_id)


@router.delete("/{time_measurement_id}")
def delete(time_measurement_id: int, db: Session = Depends(get_db)):
    return controller.delete(db=db, time_measurement_id=time_measurement_id)
