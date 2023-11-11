users = {
    "pepito": {
        "username": "pepito",
        "hashed_password": "$2y$10$OdV.HVDbckqxA.VpnYwMk.wccS4e4k06AmefrrJ8NW4pH8cb6HT5W",
    }
}


def get_user(username: str):
    if username in users:
        user = users[username]
        return user