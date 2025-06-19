from pydantic import BaseModel
from typing import List

class UserResponse(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

class GroupCreate(BaseModel):
    name: str
    user_ids: List[str]  # usernames

class GroupResponse(BaseModel):
    id: int
    name: str
    users: List[UserResponse]
