from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from jose.constants import Algorithms
from fastapi import status, Depends, HTTPException
from typing import Annotated

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="http://localhost:8000/token/")

with open("auth/key.pub", "rb") as pubkey_file:
    public_key = pubkey_file.read()
    pubkey_file.close()

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> str:

    try:
        payload = jwt.decode(token, public_key, [Algorithms.RS512])
        username: str = payload.get("sub")

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"invalid token"})

    return username