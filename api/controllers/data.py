from fastapi import APIRouter, Depends, FastAPI, status, Response
from fastapi import HTTPException, status, Response, Depends
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from models import animal_type as s_animal_type, customer as s_customer, review as s_review, service_provider as s_service_provider
from models import service_type as s_service_type, service as s_service, time_measurement as s_time_measurement, user_type as s_user_type, user as s_user



# def create(db: Session, request: schema.ServiceCreate):
           
#     new_item = model.Service(
#             user_id=request.user_id,
#             service_type_id=request.service_type_id,
#             animal_type_id=request.animal_type_id,
#             time_measurement_id=request.time_measurement_id
#         )

#     try:
#         db.add(new_item)
#         db.commit()
#         db.refresh(new_item)
#     except SQLAlchemyError as e:
#         error = str(e)
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

#     return new_item

def create(db: Session):
           
    #create the user types
    user_type_customer: s_user_type.UserType = s_user_type.UserType(
        type="customer"
    )

    user_type_service_provider: s_user_type.UserType = s_user_type.UserType(
        type="service_provider"
    )

    try:
        db.add(user_type_customer)
        db.add(user_type_service_provider)
        db.commit()
        db.refresh(user_type_customer)
        db.refresh(user_type_service_provider)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)


    #create a customer
    user_customer: s_user.User = s_user.User(
        first_name="john",
        last_name="doe",
        age=25,
        profile_picture="null",
        user_type_id=1
    )


    try:
        db.add(user_customer)
        db.commit()
        db.refresh(user_customer)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    #create a service provider
    user_service_provider: s_user.User = s_user.User(
        first_name="jane",
        last_name="smith",
        age=22,
        profile_picture="null",
        user_type_id=2
    )

    try:
        db.add(user_service_provider)
        db.commit()
        db.refresh(user_service_provider)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    #create a service_provider and customer from the users
    customer: s_customer.Customer = s_customer.Customer(
        user_id=1
    )

    service_provider: s_service_provider.ServiceProvider = s_service_provider.ServiceProvider(
        user_id=2,
        rating=0,
        title="Jane's Dog Walking",
        biography="Hey! I'm jane a professional dog walker."
    )

    try:
        db.add(service_provider)
        db.add(customer)
        db.commit()
        db.refresh(service_provider)
        db.refresh(customer)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    #create an animal type
    animal_type: s_animal_type.AnimalType = s_animal_type.AnimalType(
        type="Dog"
    )


    try:
        db.add(animal_type)
        db.commit()
        db.refresh(animal_type)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    #create a service type
    service_type: s_service_type.ServiceType = s_service_type.ServiceType(
        type="Walking"
    )

    try:
        db.add(service_type)
        db.commit()
        db.refresh(service_type)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    #create a time measurement (days / hours / weeks)
    time_measurement: s_time_measurement.TimeMeasurement = s_time_measurement.TimeMeasurement(
        type="Day"
    )
    try:
        db.add(time_measurement)
        db.commit()
        db.refresh(time_measurement)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)


    #create a service
    service: s_service.Service = s_service.Service(
        price=24.99,
        user_id=2,
        service_type_id=1,
        animal_type_id=1,
        time_measurement_id=1
    )

    try:
        db.add(service)
        db.commit()
        db.refresh(service)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    #create a review
    review: s_review.Review = s_review.Review(
        customer_id=1,
        service_provider_id=1,
        review="Great!",
        rating="4.2"
    )

    try:
        db.add(review)
        db.commit()
        db.refresh(review)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)