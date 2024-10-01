from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SESSION_SECRET_KEY: str = ""
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    API_ROUTE_PREFIX: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
