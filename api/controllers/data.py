from fastapi import APIRouter, Depends, FastAPI, status, Response
from fastapi import HTTPException, status, Response, Depends
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from models import animal_type as m_animal_type, customer as m_customer, review as m_review, service_provider as m_service_provider, login as m_login
from models import service_type as m_service_type, service as m_service, time_measurement as m_time_measurement, user_type as m_user_type, user as m_user
from models import pet as m_pet
from names import names
import random



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

def getRandomName():
    return names[random.randint(0, len(names) - 1)]

#1 for cats, 2 for dogs, 3 for both
def pickRandomAnimal():
    type = random.randint(1, 3)
    if type == 3:
        return [1, 2]

    arr = []
    arr.append(type)
    return arr

#binary representation of walking, sitting, grooming
#ex 5 = 101 = walking and grooming, but not sitting
def pickRandomServices():
    animals = []

    for i in range(3):
        if random.randint(0, 1) == 1:
            animals.append(i + 1)

    return animals


def addRandomServiceProvider(db: Session):
    name = getRandomName()
    split = name.split(" ")
    fname: str = split[0]
    lname: str = split[1]
    
    #create a user
    user_service_provider: m_user.User = m_user.User(
        user_name=fname[0] + lname[0] + str(random.randint(12, 345)),
        first_name=fname,
        last_name=lname,
        age=random.randint(18, 60),
        profile_picture="null",
        user_type_id=2,
        biography="We employ reliable, loving pet caregivers who can come to you, allowing us to provide your pet or pets with top-quality care in your own home. Whether you work long hours, are traveling out of town or simply want your pup(s) to have extra exercise even when you’re home – we have all the services to help out you and your pet(s). In addition, we offer occasional boarding services. To make a reservation, you can use our handy form, or reach out to us via call or text using the provided number above.",
        contact_info="email@email.com, 012-345-6789"
    )
    try:
        db.add(user_service_provider)
        db.commit()
        db.refresh(user_service_provider)
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)



    #create a service_provider
    service_provider: m_service_provider.ServiceProvider = m_service_provider.ServiceProvider(
        user_id=user_service_provider.id,
        rating=0,
        title=None
    )

    try:
        db.add(service_provider)
        db.commit()
        db.refresh(service_provider)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

        #create a login
    login: m_login.Login = m_login.Login(
        user_id=service_provider.user_id,
        password_hash="123"
    )

    try:
        db.add(login)
        db.commit()
        db.refresh(login)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    
    return service_provider


def addRandomService(db: Session, service_provider: m_service_provider.ServiceProvider):
    
    animals = pickRandomAnimal()
    services = pickRandomServices()

    for a in animals:
        for s in services:
            #create a service
            service: m_service.Service = m_service.Service(
                price=random.randint(10, 50) + random.randint(0, 99) / 100,
                user_id=service_provider.user_id,
                service_type_id=s,
                animal_type_id=a,
                time_measurement_id=1
            )

            try:
                db.add(service)
                db.commit()
                db.refresh(service)
            except SQLAlchemyError as e:
                error = str(e)
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

def addServiceTypes(db: Session):
    
    types = ["Walking", "Sitting", "Grooming"]

    for i in range(3):
        #create a service type
        service_type: m_service_type.ServiceType = m_service_type.ServiceType(
            type=types[i]
        )

        try:
            db.add(service_type)
            db.commit()
            db.refresh(service_type)
        except SQLAlchemyError as e:
            error = str(e)
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)


def addRandomCustomer(db: Session):
    name = getRandomName()
    split = name.split(" ")
    fname: str = split[0]
    lname: str = split[1]

    #create a customer
    user_customer: m_user.User = m_user.User(
        user_name=fname[0] + lname[0] + str(random.randint(12, 345)),
        first_name=fname,
        last_name=lname,
        age=random.randint(18, 60),
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

        
    #create a customer from the user
    customer: m_customer.Customer = m_customer.Customer(
        user_id=user_customer.id
    )

    try:
        db.add(customer)
        db.commit()
        db.refresh(customer)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    return customer

def addRandomReviews(db: Session, customer: m_customer.Customer, max_service_provider_id):

    sample = random.sample(range(1, max_service_provider_id), random.randint(1, 5))
    reviews = ["The service was great!", "The service was pretty good.", "The service was just okay.", "The service was not as good as I had hoped it would be.", "The service was terrible!"]
    for id in sample:
        rnd_rating = random.randint(1, 5)
        #create a review
        review: m_review.Review = m_review.Review(
            user_id=customer.user_id,
            service_provider_id=id,
            review=reviews[5 - rnd_rating],
            rating=rnd_rating
        )

        try:
            db.add(review)
            db.commit()
            db.refresh(review)
        except SQLAlchemyError as e:
            error = str(e)
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

def create(db: Session):
           
    
    #create the user types
    user_type_customer: m_user_type.UserType = m_user_type.UserType(
        type="customer"
    )

    user_type_service_provider: m_user_type.UserType = m_user_type.UserType(
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




    #create an animal type
    animal_type: m_animal_type.AnimalType = m_animal_type.AnimalType(
        type="Dog"
    )

    try:
        db.add(animal_type)
        db.commit()
        db.refresh(animal_type)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    #create an animal type
    animal_type: m_animal_type.AnimalType = m_animal_type.AnimalType(
        type="Cat"
    )

    try:
        db.add(animal_type)
        db.commit()
        db.refresh(animal_type)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)


    #create a time measurement (days / hours / weeks)
    time_measurement: m_time_measurement.TimeMeasurement = m_time_measurement.TimeMeasurement(
        type="Day"
    )
    try:
        db.add(time_measurement)
        db.commit()
        db.refresh(time_measurement)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    addServiceTypes(db=db)

    for i in range(20):
        addRandomService(db, addRandomServiceProvider(db=db))

    for i in range(20):
        addRandomReviews(db, addRandomCustomer(db=db), 20)

    
    #create a pet
    pet: m_pet.Pet = m_pet.Pet(
        user_id=1,
        animal_type_id=1,
        name="Bruno",
        picture="null"
    )

    try:
        db.add(pet)
        db.commit()
        db.refresh(pet)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    
    #create a login
    login: m_login.Login = m_login.Login(
        user_id=1,
        password_hash="5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
    )

    try:
        db.add(login)
        db.commit()
        db.refresh(login)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)