import User from "../models/User.js"

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)

    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

export const getFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await promise.all(
            user.friends.map((id) => {
                User.findById(id);
            })
        )
        const formattedFriends = friends.map(
            ({_id,firstName, lastName,occupation,location,picturePath}) => {
                return { _id,firstName, lastName,occupation,location,picturePath }
            })

        res.status(200).json(formattedFriends)

    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        let user = await User.findById(id);
        let friend = await User.findById(friendId)

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendID)
            friend.friends = friend.friends.filter((id) => id !== id)
        }else{
            user.friends.push(friendID)
            friend.friends.push(id)
        }

        await user.save();
        await friend.save();

        const friends = await promise.all(
            user.friends.map((id) => {
                User.findById(id);
            })
        )
        const formattedFriends = friends.map(
            ({_id,firstName, lastName,occupation,location,picturePath}) => {
                return { _id,firstName, lastName,occupation,location,picturePath }
            })
        res.status(200).json(formattedFriends);

    } catch (err) {
        
    }
}