from fastapi import APIRouter, Depends, FastAPI, status, Response
from sqlalchemy.orm import Session
from controllers import data as controller
from dependencies.database import engine, get_db

router = APIRouter(
    tags=['Data'],
    prefix="/data"
)



@router.post("/")
def create_basic_data(db: Session = Depends(get_db)):

    controller.create(db=db)

    return status.HTTP_201_CREATED