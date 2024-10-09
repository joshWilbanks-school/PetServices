from fastapi import APIRouter, Depends, FastAPI, status, Response
from sqlalchemy.orm import Session
from controllers import user_type as controller
from schemas import user_type as schema
from dependencies.database import engine, get_db

router = APIRouter(
    tags=['UserType'],
    prefix="/user_type"
)


@router.post("/", response_model=schema.UserType)
def create(request: schema.UserTypeCreate, db: Session = Depends(get_db)):
    return controller.create(db=db, request=request)


@router.get("/", response_model=list[schema.UserType])
def read_all(db: Session = Depends(get_db)):
    return controller.read_all(db)


@router.get("/{user_type_id}", response_model=schema.UserType)
def read_one(user_type_id: int, db: Session = Depends(get_db)):
    return controller.read_one(db, user_type_id=user_type_id)


@router.put("/{user_type_id}", response_model=schema.UserType)
def update(user_type_id: int, request: schema.UserTypeUpdate, db: Session = Depends(get_db)):
    return controller.update(db=db, request=request, user_type_id=user_type_id)


@router.delete("/{user_type_id}")
def delete(user_type_id: int, db: Session = Depends(get_db)):
    return controller.delete(db=db, user_type_id=user_type_id)
