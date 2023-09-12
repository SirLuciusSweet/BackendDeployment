import { Schema, model} from "mongoose";

const followersSchema = new Schema({
    userFollows: {type: Schema.Types.ObjectId, ref : "User"},
    userFollowed : {type: Schema.Types.ObjectId, ref : "User"},
})

const Followers = model("Followers", followersSchema);

export default Followers;