from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Group, User
from ..schemas import GroupCreate, GroupResponse, UserResponse

router = APIRouter(prefix="/groups", tags=["Groups"])

# POST /groups
@router.post("/", response_model=GroupResponse)
def create_group(payload: GroupCreate, db: Session = Depends(get_db)):
    group = Group(name=payload.name)
    db.add(group)
    db.commit()
    db.refresh(group)

    users = []
    for user_name in payload.user_ids:
        user = db.query(User).filter_by(name=user_name).first()
        if not user:
            user = User(name=user_name)
            db.add(user)
            db.commit()
            db.refresh(user)
        users.append(user)

    for user in users:
        user.group_id = group.id
        db.add(user)

    db.commit()

    
    return {
        "id": group.id,
        "name": group.name,
        "users": [{"id": user.id, "name": user.name} for user in users]
    }

@router.get("/")
def get_all_groups(db: Session = Depends(get_db)):
    groups = db.query(Group).all()
    return [{"id": g.id, "name": g.name} for g in groups]

# GET /groups/{group_id}
@router.get("/{group_id}", response_model=GroupResponse)
def get_group(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    return {
        "id": group.id,
        "name": group.name,
        "users": [{"id": user.id, "name": user.name} for user in group.users]
    }
