const express=require("express");
const {sendFriendRequest,acceptFriendRequest,rejectFriendRequest,getFriendRequests,} = require("../controllers/friendRequestController");

const router=express.Router();


router.post("/send", sendFriendRequest);
router.put("/accept/:requestId", acceptFriendRequest);
router.put("/reject/:requestId", rejectFriendRequest);
router.get("/:userId", getFriendRequests);

module.exports = router;
