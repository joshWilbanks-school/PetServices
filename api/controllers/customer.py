from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Response, Depends
from models import customer as model
from schemas import customer as schema, user
from controllers import user as cUser
from sqlalchemy.exc import SQLAlchemyError


def create(db: Session, request: schema.CustomerCreate):
           
    new_item = model.Customer(
            user_id=request.user_id
        )

    try:
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    return new_item

def create_with_user(db: Session, request: user.UserCreate):
    user = cUser.create(db=db, request=request)
    customer = create(db=db, request=schema.CustomerCreate(user_id=user.id))
    return customer


def read_all(db: Session):
    try:
        result = db.query(model.Customer).all()
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return result


def read_one(db: Session, customer_id: int):
    try:
        item = db.query(model.Customer).filter(model.Customer.id == customer_id).first()
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return item


def update(db: Session, customer_id: int, request):
    try:
        item = db.query(model.Customer).filter(model.Customer.id == customer_id)
        if not item.first():
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
        update_data = request.dict(exclude_unset=True)
        item.update(update_data, synchronize_session=False)
        db.commit()
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return item.first()


def delete(db: Session, customer_id: int):
    try:
        item = db.query(model.Customer).filter(model.Customer.id == customer_id)
        if not item.first():
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
        item.delete(synchronize_session=False)
        db.commit()
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

