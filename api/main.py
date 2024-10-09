from typing import Union
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import uvicorn
# from routers import index as indexRoute
# from models import model_loader
# from dependencies.config import web_conf


app = FastAPI()
asdf = 1
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# model_loader.index()
# indexRoute.load_routes(app)


if __name__ == "__main__":
    uvicorn.run("main:app", host=web_conf.app_host, port=web_conf.app_port)