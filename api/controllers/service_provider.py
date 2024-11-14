from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Response, Depends
from models import service_provider as model
from schemas import service_provider as schema, user as sUser
from controllers import user as cUser
from sqlalchemy.exc import SQLAlchemyError


def create(db: Session, request: schema.ServiceProviderCreate):

    # id: int
    # user_id: int
    # rating: int
    # title: str
    # biography: str
           
    new_item = model.ServiceProvider(
            user_id=request.user_id,
            rating=request.rating,
            title=request.title,
            biography=request.biography
        )

    try:
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    return new_item


def create_with_user(db: Session, request: schema.ServiceProviderCreateWithUser):

    
# class UserCreate(BaseModel):
#     first_name: str
#     last_name: str
#     age: int
#     profile_picture: str
#     user_type_id: int
    user = cUser.create(db=db, request=sUser.UserCreate(
        first_name=request.first_name,
        last_name=request.last_name,
        age=request.age,
        profile_picture=request.profile_picture, 
        user_type_id=request.user_type_id
        ))
    
    
# class ServiceProviderCreate(BaseModel):
#     user_id: int
#     title: str
#     biography: str
    s = create(db=db, request=schema.ServiceProviderCreate(user_id=user.id, title=request.title, biography=request.biography))
    return s



def read_all(db: Session):
    try:
        result = db.query(model.ServiceProvider).all()
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return result


def read_one(db: Session, user_id: int):
    try:
        item = db.query(model.ServiceProvider).filter(model.ServiceProvider.id == user_id).first()
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return item


def update(db: Session, user_id: int, request):
    try:
        item = db.query(model.ServiceProvider).filter(model.ServiceProvider.id == user_id)
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
        item = db.query(model.ServiceProvider).filter(model.ServiceProvider.id == user_id)
        if not item.first():
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
        item.delete(synchronize_session=False)
        db.commit()
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

