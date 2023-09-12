import express from "express"
import { createPost, getAllPosts, getOnePost, getUserPosts } from "../controllers/postController.js";
import authorization from "../middlewares/authorization.js";

const router = express.Router();


 router.post("/create" , authorization, createPost );

router.get("/all" , getAllPosts);

router.get("/getOne/:id" , getOnePost);

router.get("/getUsersPosts/:id", getUserPosts)


export default router;