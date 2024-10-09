from fastapi import APIRouter, Depends, FastAPI, status, Response
from sqlalchemy.orm import Session
from controllers import user as controller
from schemas import user as schema
from dependencies.database import engine, get_db

router = APIRouter(
    tags=['User'],
    prefix="/user"
)


@router.post("/", response_model=schema.User)
def create(request: schema.UserCreate, db: Session = Depends(get_db)):
    user: schema.User =  controller.create(db=db, request=request)
    return user


@router.get("/", response_model=list[schema.User])
def read_all(db: Session = Depends(get_db)):
    return controller.read_all(db)


@router.get("/{user_id}", response_model=schema.User)
def read_one(user_id: int, db: Session = Depends(get_db)):
    return controller.read_one(db, user_id=user_id)


@router.put("/{user_id}", response_model=schema.User)
def update(user_id: int, request: schema.UserUpdate, db: Session = Depends(get_db)):
    return controller.update(db=db, request=request, user_id=user_id)


@router.delete("/{user_id}")
def delete(user_id: int, db: Session = Depends(get_db)):
    return controller.delete(db=db, user_id=user_id)
