import express from "express"
import mongodb from "mongodb"
require('dotenv').config();

const router = express.Router()

// GET Posts
router.get("/", async (req, res) => {
  try {
    const postsCollection = await loadPostsCollection()
    const posts = await postsCollection.find({}).toArray()
    res.send(posts)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error fetching posts")
  }
})

// POST - Create new post
router.post("/", async (req, res) => {
  try {
    const postsCollection = await loadPostsCollection()
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await postsCollection.insertOne(newPost)
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      postId: result.insertedId,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: "Error creating post",
    })
  }
})

// Utility: Load posts collection
async function loadPostsCollection() {
const client = await mongodb.MongoClient.connect(
  process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  return client.db("cluster0").collection("posts")
}

export default router
