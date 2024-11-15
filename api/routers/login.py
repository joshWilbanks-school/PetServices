from fastapi import APIRouter, Depends, FastAPI, status, Response
from sqlalchemy.orm import Session
from controllers import login as controller
from schemas import login as schema, user
from dependencies.database import engine, get_db

router = APIRouter(
    tags=['Login'],
    prefix="/login"
)


@router.post("/", response_model=schema.Login)
def create(request: schema.LoginCreate, db: Session = Depends(get_db)):
    login: schema.Login =  controller.create(db=db, request=request)
    return login


@router.get("/", response_model=list[schema.Login])
def read_all(db: Session = Depends(get_db)):
    return controller.read_all(db)


@router.get("/{login_id}", response_model=schema.Login)
def read_one(login_id: int, db: Session = Depends(get_db)):
    return controller.read_one(db, login_id=login_id)

@router.get("/get_by_user_id/{user_id}", response_model=schema.Login)
def read_one(user_id: int, db: Session = Depends(get_db)):
    return controller.get_by_user_id(db, user_id=user_id)


@router.put("/{login_id}", response_model=schema.Login)
def update(login_id: int, request: schema.LoginUpdate, db: Session = Depends(get_db)):
    return controller.update(db=db, request=request, login_id=login_id)


@router.delete("/{login_id}")
def delete(login_id: int, db: Session = Depends(get_db)):
    return controller.delete(db=db, login_id=login_id)
