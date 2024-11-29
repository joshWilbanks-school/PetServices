from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Response, Depends
from models import review as model
from schemas import review as schema
from sqlalchemy.exc import SQLAlchemyError


# class review(Base):
#     __tablename__ = "review"
#     id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
#     customer_id = Column(Integer, ForeignKey("customer.id"), nullable=False)
#     service_provider_id = Column(Integer, ForeignKey("service_provider.id"), nullable=False)
#     review = Column(String(1000), nullable=True)
#     rating = Column(DECIMAL(5,2), nullable=True)

def create(db: Session, request: schema.ReviewCreate):
           
    new_item: model.Review = model.Review(
            customer_id=request.customer_id,
            service_provider_id=request.service_provider_id,
            review=request.review,
            rating=request.rating
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
        result = db.query(model.Review).all()
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return result


def read_one(db: Session, Review_id: int):
    try:
        item = db.query(model.Review).filter(model.Review.id == Review_id).first()
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return item


def update(db: Session, Review_id: int, request):
    try:
        item = db.query(model.Review).filter(model.Review.id == Review_id)
        if not item.first():
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
        update_data = request.dict(exclude_unset=True)
        item.update(update_data, synchronize_session=False)
        db.commit()
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return item.first()


def delete(db: Session, Review_id: int):
    try:
        item = db.query(model.Review).filter(model.Review.id == Review_id)
        if not item.first():
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Id not found!")
        item.delete(synchronize_session=False)
        db.commit()
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

