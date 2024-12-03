from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Response, Depends
from models import service as model
from schemas import service as schema
from sqlalchemy.exc import SQLAlchemyError


def create(db: Session, request: schema.ServiceCreate):
           
    new_item = model.Service(
            user_id=request.user_id,
            price=request.price,
            service_type_id=request.service_type_id,
            animal_type_id=request.animal_type_id,
            time_measurement_id=request.time_measurement_id
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
        result = db.query(model.Service).all()
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return result

def get_all_by_user_id(db: Session, user_id: int):
    try:
        result = db.query(model.Service).filter(model.Service.user_id == user_id).all()
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return result


def read_one(db: Session, service_id: int):
    try:
        item = db.query(model.Service).filter(model.Service.id == service_id).first()
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return item


def update(db: Session, service_id: int, request):
    try:
        item = db.query(model.Service).filter(model.Service.id == service_id)
        if not item.first():
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
        update_data = request.dict(exclude_unset=True)
        item.update(update_data, synchronize_session=False)
        db.commit()
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return item.first()


def delete(db: Session, service_id: int):
    try:
        item = db.query(model.Service).filter(model.Service.id == service_id)
        if not item.first():
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
        item.delete(synchronize_session=False)
        db.commit()
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

