from fastapi import APIRouter, Depends, FastAPI, status, Response
from sqlalchemy.orm import Session
from controllers import service_provider as controller
from schemas import service_provider as schema, user
from dependencies.database import engine, get_db

router = APIRouter(
    tags=['ServiceProvider'],
    prefix="/service_provider"
)



@router.post("/", response_model=schema.ServiceProvider)
def create(request: schema.ServiceProviderCreate, db: Session = Depends(get_db)):
    service_provider: schema.ServiceProvider =  controller.create(db=db, request=request)
    return service_provider

@router.post("/create_with_user", response_model=schema.ServiceProvider)
def create(request: schema.ServiceProviderCreateWithUser, db: Session = Depends(get_db)):
    s: schema.ServiceProvider = controller.create_with_user(db=db, request=request)
    return s

@router.get("/", response_model=list[schema.ServiceProvider])
def read_all(db: Session = Depends(get_db)):
    return controller.read_all(db)


@router.get("/{user_id}", response_model=schema.ServiceProvider)
def read_one(user_id: int, db: Session = Depends(get_db)):
    return controller.read_one(db, user_id=user_id)


@router.put("/{user_id}", response_model=schema.ServiceProvider)
def update(user_id: int, request: schema.ServiceProviderUpdate, db: Session = Depends(get_db)):
    return controller.update(db=db, request=request, user_id=user_id)


@router.delete("/{user_id}")
def delete(user_id: int, db: Session = Depends(get_db)):
    return controller.delete(db=db, user_id=user_id)
