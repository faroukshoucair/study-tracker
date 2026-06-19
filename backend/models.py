from database import Base
from sqlalchemy import Column, Integer, Float, Date
from sqlalchemy.sql import func

class StudyLog(Base):
  __tablename__ = "study_log"

  id = Column(Integer, primary_key=True, index=True)
  duration = Column(Float, nullable=False)
  date = Column(Date, default=func.current_date(), nulllable=False)

  
