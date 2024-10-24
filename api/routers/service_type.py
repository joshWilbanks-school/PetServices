from fastapi import APIRouter, Depends, FastAPI, status, Response
from sqlalchemy.orm import Session
from controllers import service_type as controller
from schemas import service_type as schema
from dependencies.database import engine, get_db

router = APIRouter(
    tags=['ServiceType'],
    prefix="/service_type"
)


@router.post("/", response_model=schema.ServiceType)
def create(request: schema.ServiceTypeCreate, db: Session = Depends(get_db)):
    service_type: schema.ServiceType =  controller.create(db=db, request=request)
    return service_type


@router.get("/", response_model=list[schema.ServiceType])
def read_all(db: Session = Depends(get_db)):
    return controller.read_all(db)


@router.get("/{service_type_id}", response_model=schema.ServiceType)
def read_one(service_type_id: int, db: Session = Depends(get_db)):
    return controller.read_one(db, service_type_id=service_type_id)


@router.put("/{service_type_id}", response_model=schema.ServiceType)
def update(service_type_id: int, request: schema.ServiceTypeUpdate, db: Session = Depends(get_db)):
    return controller.update(db=db, request=request, service_type_id=service_type_id)


@router.delete("/{service_type_id}")
def delete(service_type_id: int, db: Session = Depends(get_db)):
    return controller.delete(db=db, service_type_id=service_type_id)
