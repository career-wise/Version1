from fastapi import APIRouter
from app.api.endpoints import chat, auth

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])

# TODO: Add these when the endpoint files are created
# api_router.include_router(career.router, prefix="/career", tags=["career"])
# api_router.include_router(assessments.router, prefix="/assessments", tags=["assessments"])