from pydantic import BaseModel
from typing import List
from pydantic import BaseModel
from typing import List, Optional, Literal

class PercentageSplit(BaseModel):
    user_id: int
    percentage: float

class ExpenseCreate(BaseModel):
    description: str
    amount: float
    paid_by: int
    split_type: Literal["equal", "percentage"]
    splits: Optional[List[PercentageSplit]] = []

class ExpenseSplitResponse(BaseModel):
    user_id: int
    amount: float

class ExpenseResponse(BaseModel):
    id: int
    description: str
    amount: float
    paid_by: int
    splits: List[ExpenseSplitResponse]

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
