from fastapi import FastAPI, UploadFile, Form, File, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from typing import List
import gridfs
from pymongo import MongoClient
from bson.objectid import ObjectId
from fastapi.responses import StreamingResponse, JSONResponse
from gridfs import GridFS

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
motor_client = AsyncIOMotorClient("mongodb://localhost:27017")
db = motor_client["Foodie"]
collection = db["postData"]

client = MongoClient("mongodb://localhost:27017")
db2 = client["Foodie_Image"]
fs = gridfs.GridFS(db2)

db3 = client["postData"]
fs2 = GridFS(db3, collection="post_images")

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/api/get_image_by_id/{image_id}")
def get_image_by_id(image_id: str):
    try:
        # Convert the given image_id string to an ObjectId
        image_object_id = ObjectId(image_id)

        # Retrieve the file from GridFS using the ObjectId
        image_file = fs.get(image_object_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail="Image not found")

    # Set the response content type to "image/jpeg"
    headers = {
        "Content-Type": "image/jpeg",
        "Content-Disposition": f"inline; filename={image_file.filename}",
    }

    # Stream the binary data as a response
    return StreamingResponse(iter(image_file), headers=headers)



@app.post("/uploadText", response_model=PostText)
async def upload_text(message: PostText):
    # Insert the text into the MongoDB collection
    response = await collection.insert_one({"text": message.text})
    
    # Check if the insertion was successful
    if response.inserted_id:
        return message
    
    # If insertion failed, raise an HTTPException
    raise HTTPException(500, 'Error occurred while uploading text to MongoDB')


# this post work in ShowImg.tsx
@app.post("/upload_image")
async def upload_image(image: UploadFile = File(...)):
    # Save the image data to MongoDB using GridFS
    file_id = fs.put(image.file, filename=image.filename)
    return {"message": "Image uploaded successfully!", "file_id": str(file_id)}




@app.post("/api/upload_images")
async def upload_images(images: List[UploadFile] = File(...)):
    image_ids = []
    for image in images:
        try:
            # Save each uploaded image to the GridFS collection
            image_id = fs.put(image.file, filename=image.filename)
            image_ids.append(str(image_id))
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to save image {image.filename}")

    return JSONResponse(content={"message": "Images uploaded successfully", "image_ids": image_ids})

@app.post("/save_post_with_images")
async def save_post_with_images(images: List[UploadFile] = File(...), description: str = ""):
    try:
        # Save each uploaded image to the GridFS collection and get their IDs
        image_ids = []
        for image in images:
            image_data = await image.read()  # Read the file data from the UploadFile object
            image_id = await fs2.put(image_data, filename=image.filename)
            image_ids.append(str(image_id))

        # Save the post data to the "posts" collection
        post_data = {
            "images": image_ids,
            "description": description
        }
        post_collection = db3["posts"]
        post_id = await post_collection.insert_one(post_data)

        return str(post_id.inserted_id)  # Return the ID of the saved post document

    except Exception as e:
        raise ValueError("Failed to save post data to the database")

# Connect to MongoDB using motor
db3: AsyncIOMotorDatabase = motor_client.get_database("postData")
pymongo_db = MongoClient("mongodb://localhost:27017/")["postData"]  # Synchronous pymongo client for GridFS
fs2 = GridFS(pymongo_db, collection="post_images")

async def save_post_with_images(images: List[UploadFile] = File(...), description: str = ""):
    try:
        # Save each uploaded image to the GridFS collection and get their IDs
        image_ids = []
        for image in images:
            image_data = await image.read()  # Read the file data from the UploadFile object
            image_id = fs2.put(image_data, filename=image.filename)
            image_ids.append(str(image_id))

        # Save the post data to the "posts" collection
        post_data = {
            "images": image_ids,
            "description": description
        }
        post_collection = db3["posts"]
        post_id = await post_collection.insert_one(post_data)

        return str(post_id.inserted_id)  # Return the ID of the saved post document

    except Exception as e:
        raise ValueError("Failed to save post data to the database")

# API endpoint to upload images and description
@app.post("/api/upload_images2/")
async def upload_images_with_description(images: List[UploadFile] = File(...), description: str = ""):
    post_id = await save_post_with_images(images, description)
    return {"message": "Post with images uploaded successfully", "post_id": post_id}


# API endpoint to get specific post information
@app.get("/api/get_post/{post_id}")
async def get_post_by_id(post_id: str):
    try:
        # Convert the post ID string to ObjectId
        post_object_id = ObjectId(post_id)

        # Find the post by its _id in the "posts" collection
        post_collection = db3["posts"]
        post_data = await post_collection.find_one({"_id": post_object_id})

        # Check if the post exists
        if post_data is None:
            raise HTTPException(status_code=404, detail="Post not found")

        # Convert ObjectId to string for image IDs
        post_data["images"] = [str(image_id) for image_id in post_data["images"]]

        return post_data

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to retrieve post data from the database")
