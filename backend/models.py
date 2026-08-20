from database import Base
from sqlalchemy import Column, Integer, Float, Date, String
from datetime import datetime
import zoneinfo

def get_local_date():
  return datetime.now(zoneinfo.ZoneInfo("America/Chicago")).date()

class StudyLog(Base):
  __tablename__ = "study_log"

  id = Column(Integer, primary_key=True, index=True)
  duration = Column(Float, nullable=False)
  date = Column(Date, default=get_local_date, nullable=False)

class User(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True, index=True)
  username = Column(String, unique=True, index=True, nullable=False)
  hashed_password = Column(String, nullable=False)

  
