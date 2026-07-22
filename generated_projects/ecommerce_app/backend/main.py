from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from app.routers import products
from app.routers import orders
from app.routers import customers
from app.routers import cart
from app.routers import inventory
from app.routers import payments

app = FastAPI(title=settings.PROJECT_NAME, version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(orders.router)
app.include_router(customers.router)
app.include_router(cart.router)
app.include_router(inventory.router)
app.include_router(payments.router)

@app.get("/")
def root():
    return {"status": "ONLINE", "project": "E-Commerce & Inventory Platform", "domain": "ecommerce"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
