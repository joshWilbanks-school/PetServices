from fastapi import APIRouter, Depends, FastAPI, status, Response
from sqlalchemy.orm import Session
from controllers import review as controller
from schemas import review as schema
from dependencies.database import engine, get_db

router = APIRouter(
    tags=['Review'],
    prefix="/Review"
)


@router.post("/", response_model=schema.Review)
def create(request: schema.ReviewCreate, db: Session = Depends(get_db)):
    Review: schema.Review =  controller.create(db=db, request=request)
    return Review


@router.get("/", response_model=list[schema.Review])
def read_all(db: Session = Depends(get_db)):
    return controller.read_all(db)


@router.get("/{Review_id}", response_model=schema.Review)
def read_one(Review_id: int, db: Session = Depends(get_db)):
    return controller.read_one(db, Review_id=Review_id)


@router.put("/{Review_id}", response_model=schema.Review)
def update(Review_id: int, request: schema.ReviewUpdate, db: Session = Depends(get_db)):
    return controller.update(db=db, request=request, Review_id=Review_id)


@router.delete("/{Review_id}")
def delete(Review_id: int, db: Session = Depends(get_db)):
    return controller.delete(db=db, Review_id=Review_id)
