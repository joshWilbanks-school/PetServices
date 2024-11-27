from sqlalchemy.orm import Session, NO_VALUE
from fastapi import HTTPException, status, Response, Depends
from models import login as model
from schemas import login as schema, user
from controllers import user as cUser
from sqlalchemy.exc import SQLAlchemyError


def create(db: Session, request: schema.LoginCreate):
           
    new_item = model.Login(
            user_id=request.user_id,
            password_hash=request.password_hash
        )

    try:
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    return new_item

def sign_up(db: Session, request: schema.SignUp):
    userC = user.UserCreate(user_name=request.user_name, user_type_id=request.user_type_id, first_name=None, last_name=None, age=None, profile_picture=None)
    userC = cUser.create(db=db, request=userC)

    create(db=db, request=schema.LoginCreate(user_id=userC.id, password_hash=request.password_hash))

    return userC
    

def read_all(db: Session):
    try:
        result = db.query(model.Login).all()
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return result


def read_one(db: Session, login_id: int):
    try:
        item = db.query(model.Login).filter(model.Login.id == login_id).first()
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return item

def get_by_user_id(db: Session, user_id: int):
    try:
        item = db.query(model.Login).filter(model.Login.user_id == user_id).first()
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return item


def update(db: Session, login_id: int, request):
    try:
        item = db.query(model.Login).filter(model.Login.id == login_id)
        if not item.first():
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
        update_data = request.dict(exclude_unset=True)
        item.update(update_data, synchronize_session=False)
        db.commit()
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return item.first()


def delete(db: Session, login_id: int):
    try:
        item = db.query(model.Login).filter(model.Login.id == login_id)
        if not item.first():
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
        item.delete(synchronize_session=False)
        db.commit()
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

