from fastapi import APIRouter, Depends, FastAPI, status, Response
from sqlalchemy.orm import Session
from controllers import pet as controller
from schemas import pet as schema
from dependencies.database import engine, get_db

router = APIRouter(
    tags=['Pet'],
    prefix="/pet"
)


@router.post("/", response_model=schema.Pet)
def create(request: schema.PetCreate, db: Session = Depends(get_db)):
    pet: schema.Pet =  controller.create(db=db, request=request)
    return pet


@router.get("/", response_model=list[schema.Pet])
def read_all(db: Session = Depends(get_db)):
    return controller.read_all(db)


@router.get("/{pet_id}", response_model=schema.Pet)
def read_one(pet_id: int, db: Session = Depends(get_db)):
    return controller.read_one(db, pet_id=pet_id)


@router.put("/{pet_id}", response_model=schema.Pet)
def update(pet_id: int, request: schema.PetUpdate, db: Session = Depends(get_db)):
    return controller.update(db=db, request=request, pet_id=pet_id)


@router.delete("/{pet_id}")
def delete(pet_id: int, db: Session = Depends(get_db)):
    return controller.delete(db=db, pet_id=pet_id)
