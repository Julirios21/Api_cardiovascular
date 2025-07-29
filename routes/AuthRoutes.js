// backend/routes/AuthRoutes.js
const { Router } = require("express"); // CommonJS
const {
  profile,
  signin,
  signout,
  signup,
} = require("../controllers/AuthController.js"); 
const { isAuth } = require("../middlewares/auth.middleware.js"); 
const { validateSchema } = require("../middlewares/validate.middleware.js"); 
const { signinSchema, signupSchema } = require("../schemas/auth.schema.js"); 

const router = Router();

router.post("/signin", validateSchema(signinSchema), signin);
router.post("/signup", validateSchema(signupSchema), signup);
router.post("/signout", signout);
router.get("/profile", isAuth, profile);

module.exports = router;