from fastapi import FastAPI, HTTPException, Depends, Body
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
import models
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Hello!")

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
    print(duration)
    new_log = models.StudyLog(duration=duration)
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return new_log

@app.get("/log")
def get_data(db: Session=Depends(get_db)):
    all_logs = db.query(models.StudyLog).all()
    return all_logs