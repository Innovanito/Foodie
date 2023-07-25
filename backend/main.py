from fastapi import FastAPI, UploadFile, Form, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List,Dict



class PostImage(BaseModel):
    image: str
    desc: str


class CommentInfo(BaseModel):
    user: str
    commetInfo: str


class LikeInfo(BaseModel):
    totalLikes: int
    isUserClickLike: bool


class SaveInfo(BaseModel):
    postId: str
    isUserClickSave: bool


class Post(BaseModel):
    imageData: PostImage
    likeInfo: LikeInfo
    commentInfo: CommentInfo
    saveInfo: SaveInfo


class UploadData(BaseModel):
    images: List[UploadFile]
    description: str

class PostText(BaseModel):
  text: str



app = FastAPI()

origins = ['http://localhost:5173']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
mongo_client = AsyncIOMotorClient("mongodb://localhost:27017")
db = mongo_client["Foodie"]
collection = db["postData"]



@app.get("/")
async def root():
    return {"message": "Hello World"}



@app.post("/upload")
# async def upload_files_and_string(images: list[UploadFile] = File(...), description: str = Form(...)):
#     response = await collection.insert_one({
#       "images": images,
#       "desc": description
#     })
#     if response:
#       return response
#     raise HTTPException(404, 'error occured in upload')

async def upload_files_and_string(images: list[UploadFile] = File(...), description: str = Form(...)):
    image_urls = []
    for image in images:
        # Save the image to a specific folder (you can modify the path accordingly)
        image_path = f"images/{image.filename}"
        with open(image_path, "wb") as f:
            f.write(await image.read())
        image_urls.append(image_path)
    
    # Insert the image URLs and description into the MongoDB collection
    response = await collection.insert_one({
        "images": image_urls,
        "desc": description
    })
    
    # Check if the insertion was successful
    if response.inserted_id:
        return response
    
    # If insertion failed, raise an HTTPException
    raise HTTPException(500, 'Error occurred while uploading images and description to MongoDB')




@app.post("/uploadText/", response_model=PostText)
async def upload_text(message: PostText):
    # Insert the text into the MongoDB collection
    response = await collection.insert_one({"text": message.text})
    
    # Check if the insertion was successful
    if response.inserted_id:
        return message
    
    # If insertion failed, raise an HTTPException
    raise HTTPException(500, 'Error occurred while uploading text to MongoDB')


class ImageData(BaseModel):
    images: list[str]  # List of base64 encoded image strings
    description: str

@app.post("/upload64")
def upload_images(data: ImageData):
    try:
        # Store the data in the MongoDB collection
        result = collection.insert_one(data.dict())
        return {"message": "Data uploaded successfully!", "inserted_id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
