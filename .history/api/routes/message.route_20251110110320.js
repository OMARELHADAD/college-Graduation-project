import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("gig route works ");
});

export default router;
