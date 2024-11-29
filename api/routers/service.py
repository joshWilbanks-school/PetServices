from fastapi import APIRouter, Depends, FastAPI, status, Response
from sqlalchemy.orm import Session
from controllers import service as controller
from schemas import service as schema
from dependencies.database import engine, get_db

router = APIRouter(
    tags=['Service'],
    prefix="/service"
)


@router.post("/", response_model=schema.Service)
def create(request: schema.ServiceCreate, db: Session = Depends(get_db)):
    service: schema.Service =  controller.create(db=db, request=request)
    return service


@router.get("/", response_model=list[schema.Service])
def read_all(db: Session = Depends(get_db)):
    return controller.read_all(db)

@router.get("/get_all_by_user_id/{user_id}", response_model=list[schema.Service])
def read_all( user_id: int, db: Session = Depends(get_db)):
    return controller.get_all_by_user_id(db, user_id)

@router.get("/{service_id}", response_model=schema.Service)
def read_one(service_id: int, db: Session = Depends(get_db)):
    return controller.read_one(db, service_id=service_id)


@router.put("/{service_id}", response_model=schema.Service)
def update(service_id: int, request: schema.ServiceUpdate, db: Session = Depends(get_db)):
    return controller.update(db=db, request=request, service_id=service_id)


@router.delete("/{service_id}")
def delete(service_id: int, db: Session = Depends(get_db)):
    return controller.delete(db=db, service_id=service_id)
