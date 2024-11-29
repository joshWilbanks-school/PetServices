from fastapi import APIRouter, Depends, FastAPI, status, Response
from sqlalchemy.orm import Session
from controllers import customer as controller
from schemas import customer as schema, user
from dependencies.database import engine, get_db

router = APIRouter(
    tags=['Customer'],
    prefix="/customer"
)


@router.post("/", response_model=schema.Customer)
def create(request: schema.CustomerCreate, db: Session = Depends(get_db)):
    customer: schema.Customer =  controller.create(db=db, request=request)
    return customer


@router.post("/create_with_user", response_model=schema.Customer)
def create(request: user.UserCreate, db: Session = Depends(get_db)):
    customer: schema.Customer = controller.create_with_user(db=db, request=request)
    return customer

@router.get("/", response_model=list[schema.Customer])
def read_all(db: Session = Depends(get_db)):
    return controller.read_all(db)


@router.get("/{customer_id}", response_model=schema.Customer)
def read_one(customer_id: int, db: Session = Depends(get_db)):
    return controller.read_one(db, customer_id=customer_id)


@router.put("/{customer_id}", response_model=schema.Customer)
def update(customer_id: int, request: schema.CustomerUpdate, db: Session = Depends(get_db)):
    return controller.update(db=db, request=request, customer_id=customer_id)


@router.delete("/{customer_id}")
def delete(customer_id: int, db: Session = Depends(get_db)):
    return controller.delete(db=db, customer_id=customer_id)
