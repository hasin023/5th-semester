from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def rootGET():
    return {"content": "Goodbye World 🔥"}