const FriendRequest=require('../models/friendRequestModel');

const sendFriendRequest=async(req,res)=>{
    try{
        const sender=req.user.userId;
        const{receiver}=req.body;
        const existingRequest=await FriendRequest.findOne({sender,receiver})
        if(existingRequest){
            return res.status(400).json({message:"Friend Request already sent"});
        }
        const newRequest = new FriendRequest({ sender, receiver });
    await newRequest.save();

    res.status(201).json({ message: "Friend request sent successfully!", newRequest });
    }
    catch(error){
        res.status(500).json({ message: error.message });

    }
}

const acceptFriendRequest=async(req,res)=>{
    try{
        const{requestId}=req.params;
        const request=await FriendRequest.findById(requestId);
        if(!request){
            return res.status(404).json({ message: "Friend request not found." });
        }
        request.status = "accepted";
    await request.save();

    res.json({ message: "Friend request accepted.", request });
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const rejectFriendRequest=async(req,res)=>{
    try{
        const{requestId}=req.params;
        const request = await FriendRequest.findById(requestId);
    if (!request) 
        {return res.status(404).json({ message: "Friend request not found." });
}
request.status = "rejected";
    await request.save();

    res.json({ message: "Friend request rejected.", request });
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
};

const getFriendRequests=async(req,res)=>{
    try{
        const{userId}=req.params;
        const requests = await FriendRequest.find({ receiver: userId,status:"pending" })
        .populate("sender", "name email")
        .sort({ createdAt: -1 });
        res.json(requests);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
      }
}
module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriendRequests,
  };