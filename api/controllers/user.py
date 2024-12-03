from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Response, Depends
from models import user as model
from schemas import user as schema
from sqlalchemy.exc import SQLAlchemyError


def create(db: Session, request: schema.UserCreate):
    new_item = model.User(
        user_name=request.user_name,
        first_name=request.first_name,
        last_name=request.last_name,
        age=request.age,
        profile_picture=request.profile_picture,
        user_type_id=request.user_type_id,
        biography=request.biography,
        contact_info=request.contact_info
    )

    try:
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    return new_item


def read_all(db: Session):
    try:
        result = db.query(model.User).all()
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return result

def get_user_by_username(db: Session, name: str):
    try:
        item = db.query(model.User).filter(model.User.user_name == name).first()
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return item

def read_one(db: Session, user_id: int):
    try:
        item = db.query(model.User).filter(model.User.id == user_id).first()
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return item

def update(db: Session, user_id: int, request):
    try:
        item = db.query(model.User).filter(model.User.id == user_id)
        if not item.first():
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
        update_data = request.dict(exclude_unset=True)
        item.update(update_data, synchronize_session=False)
        db.commit()
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return item.first()


def delete(db: Session, user_id: int):
    try:
        item = db.query(model.User).filter(model.User.id == user_id)
        if not item.first():
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
        item.delete(synchronize_session=False)
        db.commit()
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

