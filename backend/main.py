from fastapi import FastAPI, HTTPException, Depends, Body, status
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
import models
from fastapi.middleware.cors import CORSMiddleware
from datetime import date
from passlib.context import CryptContext
from pydantic import BaseModel



app = FastAPI(title="Study Tracker")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class LoginSchema(BaseModel):
    username: str
    password: str

origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Hello"}


@app.post("/log")
def log_entry(duration: float = Body(embed=True), db: Session=Depends(get_db)):
    new_log = models.StudyLog(duration=duration)
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return new_log

@app.get("/log")
def get_data(db: Session=Depends(get_db)):
    all_logs = db.query(models.StudyLog).all()
    return all_logs

@app.post("/signup")
def signup(data: LoginSchema, db: Session=Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.username == data.username).fisrt()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_UNAUTHORIZED, detail="Username already taken")
    hashed_pwd = pwd_context.hash(data.password)
    new_user = models.User(username=data.username, hashed_password=hashed_pwd)
    db.add(new_user)
    db.commit()
    return {"message": "Account created"}

#its better to not explicity tell users when its an incoorect username or incorrect passowrd for safety reasons
@app.post("/login")
def login(data: LoginSchema, db: Session=Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == data.username).first()
    password_matches = pwd_context.verify(data.password, user.hashed_password)
    if not user or not password_matches:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    return {"message": "login successful"}