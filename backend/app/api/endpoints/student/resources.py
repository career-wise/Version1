"""
Student Resources Endpoints
"""

from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List, Optional
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class Document(BaseModel):
    id: int
    name: str
    type: str
    size: str
    category: str
    upload_date: str
    starred: bool

@router.get("/documents", response_model=List[Document])
async def get_documents():
    """Get user's documents"""
    return [
        Document(
            id=1,
            name="High School Transcript",
            type="PDF",
            size="2.4 MB",
            category="academic",
            upload_date="2024-01-15",
            starred=True
        ),
        Document(
            id=2,
            name="SAT Score Report",
            type="PDF", 
            size="1.2 MB",
            category="academic",
            upload_date="2024-01-10",
            starred=False
        )
    ]

@router.post("/documents/upload")
async def upload_document(file: UploadFile = File(...), category: str = "general"):
    """Upload document"""
    try:
        # In production, this would save the file and store metadata
        return {
            "document": {
                "id": 999,
                "name": file.filename,
                "type": file.content_type,
                "size": f"{file.size / 1024:.1f} KB" if file.size else "Unknown",
                "category": category,
                "upload_date": "2024-01-15",
                "starred": False
            },
            "message": "Document uploaded successfully"
        }
    except Exception as e:
        logger.error(f"Document upload error: {e}")
        raise HTTPException(status_code=400, detail="Upload failed")

@router.delete("/documents/{document_id}")
async def delete_document(document_id: int):
    """Delete document"""
    return {"message": "Document deleted successfully"}