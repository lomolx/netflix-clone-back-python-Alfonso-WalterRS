import datetime as dt
from typing import Annotated, Dict

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from jose.constants import Algorithms
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware

import auth_api.users_db as db

app = FastAPI()

origins = [
    "http://localhost:9091", "http://localhost:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ACCESS_TOKEN_EXPIRE_SECONDS = 60 * 30


with open("auth_api/key.pem", "r") as key_file:
    private_key = key_file.read()
    key_file.close()


async def create_access_token(data: Dict, expires_delta: dt.timedelta) -> str:
    to_encode = data.copy()
    expire = dt.datetime.utcnow() + expires_delta

    to_encode.update({"exp": expire, "alg": Algorithms.RS512})
    encoded_jwt = jwt.encode(to_encode, private_key, Algorithms.RS512)

    return encoded_jwt


def authenticate_user(db: Dict, username: str, password: str) -> Dict:
    user = db.get_user(username)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not pwd_context.verify(password, user["hashed_password"]):
        return False


    return user


@app.post("/token/")
async def get_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Dict[str, str]:

    user = authenticate_user(db, form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = await create_access_token(
        {"sub": user["username"]}, dt.timedelta(seconds=ACCESS_TOKEN_EXPIRE_SECONDS)
    )

    return {"access_token": token, "token_type": "Bearer"}
