from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
import models


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hello!")

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
def log_entry(duration: float, db: Session=Depends(get_db)):
    new_log = models.StudyLog(duration=duration)
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return new_log