import Post from "..models/Post";

export const createPost = async () => {
    try {

        const userId = req.user._id;
        console.log(req.user);

        const newPost = await Post.create({...req.body , createdBy: userId})

        res.json(newPost);

    } catch (error) {
        res.json(error.message)
    }
}

export const getAllPosts = async (req,res) => {
    try {

        const posts = await Post.find.populate("createdBy")();

       res.json(posts);

    } catch (error) {
        res.json(error.message)
    }
}


export const getOnePost = async (req,res) => {
    try {

        const postId = req.params.id
        const posts = await Post.findById(postId);

       res.json(posts);

    } catch (error) {
        res.json(error.message)
    }
}

export const getUserPosts = async (req,res) => {
    try {

        const userId = req.params.id
        const posts = await Post.find({createdBy : userId}).populate("createdBy");

       res.json(posts);

    } catch (error) {
        res.json(error.message)
    }
}