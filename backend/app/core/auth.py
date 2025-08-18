from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client
from typing import Optional
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

security = HTTPBearer(auto_error=False)


def get_supabase_client() -> Client:
    """Get Supabase client for normal user authentication flows"""
    try:
        # Debug logging
        logger.info(f"Creating Supabase client with URL: {settings.SUPABASE_URL[:20]}...")
        logger.info(
            f"Using SUPABASE_ANON_KEY (length: {len(settings.SUPABASE_ANON_KEY) if settings.SUPABASE_ANON_KEY else 0})")

        # For Supabase Python client 2.0.2, use ANON_KEY for normal operations
        client = create_client(
            supabase_url=settings.SUPABASE_URL,
            supabase_key=settings.SUPABASE_ANON_KEY  # Use ANON_KEY here
        )
        logger.info("✅ Supabase client created successfully")
        return client

    except Exception as e:
        logger.error(f"❌ Failed to create Supabase client: {e}")
        logger.error(f"SUPABASE_URL: {settings.SUPABASE_URL}")
        logger.error(
            f"SUPABASE_ANON_KEY first 20 chars: {settings.SUPABASE_ANON_KEY[:20] if settings.SUPABASE_ANON_KEY else 'None'}")
        raise e


def get_supabase_admin_client() -> Client:
    """Get Supabase admin client with elevated privileges"""
    try:
        logger.info("Creating Supabase admin client...")
        client = create_client(
            supabase_url=settings.SUPABASE_URL,
            supabase_key=settings.SUPABASE_SERVICE_ROLE_KEY  # Use SERVICE_ROLE_KEY for admin operations
        )
        logger.info("✅ Supabase admin client created successfully")
        return client
    except Exception as e:
        logger.error(f"❌ Failed to create Supabase admin client: {e}")
        raise e


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user from JWT token"""
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        token = credentials.credentials
        logger.info(f"Verifying token: {token[:20]}...")

        supabase = get_supabase_client()

        # Verify token with Supabase
        user_response = supabase.auth.get_user(token)

        if not user_response.user:
            logger.warning("Token verification failed - no user returned")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

        logger.info(f"Token verified for user: {user_response.user.email}")
        return {
            "id": user_response.user.id,
            "email": user_response.user.email
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Authentication error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def verify_jwt_token(token: str) -> Optional[dict]:
    """Verify JWT token from Supabase"""
    try:
        supabase = get_supabase_client()
        user_response = supabase.auth.get_user(token)

        if user_response.user:
            return {
                "user_id": user_response.user.id,
                "email": user_response.user.email
            }
        return None
    except Exception as e:
        logger.error(f"Token verification error: {e}")
        return None


async def get_optional_current_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    """Get current user but don't raise error if not authenticated"""
    if not credentials:
        return None

    try:
        return await get_current_user(credentials)
    except HTTPException:
        return None