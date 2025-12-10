import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("conversation route works ");
});

export default router;
