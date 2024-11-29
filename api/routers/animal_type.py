from fastapi import APIRouter, Depends, FastAPI, status, Response
from sqlalchemy.orm import Session
from controllers import animal_type as controller
from schemas import animal_type as schema
from dependencies.database import engine, get_db

router = APIRouter(
    tags=['AnimalType'],
    prefix="/animal_type"
)


@router.post("/", response_model=schema.AnimalType)
def create(request: schema.AnimalTypeCreate, db: Session = Depends(get_db)):
    animal_type: schema.AnimalType =  controller.create(db=db, request=request)
    return animal_type


@router.get("/", response_model=list[schema.AnimalType])
def read_all(db: Session = Depends(get_db)):
    return controller.read_all(db)


@router.get("/{animal_type_id}", response_model=schema.AnimalType)
def read_one(animal_type_id: int, db: Session = Depends(get_db)):
    return controller.read_one(db, animal_type_id=animal_type_id)


@router.put("/{animal_type_id}", response_model=schema.AnimalType)
def update(animal_type_id: int, request: schema.AnimalTypeUpdate, db: Session = Depends(get_db)):
    return controller.update(db=db, request=request, animal_type_id=animal_type_id)


@router.delete("/{animal_type_id}")
def delete(animal_type_id: int, db: Session = Depends(get_db)):
    return controller.delete(db=db, animal_type_id=animal_type_id)
