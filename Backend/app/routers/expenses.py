from fastapi import APIRouter

router = APIRouter()

# Example endpoint to verify it's working
@router.get("/test")
def test():
    return {"msg": "Expenses router working"}
