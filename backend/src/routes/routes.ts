// routes/authRoutes.ts
import express from "express";
import { login, signup, validateSignup } from "../controllers/authController";
import {
  createContactHandler,
  deleteContactHandler,
  editContactHandler,
  fetchContactsHandler,
} from "../controllers/contactController";
import { sendEmailHandler } from "../controllers/emailController";
import {
  createMaliciousHandler,
  deleteMaliciousHandler,
  editMaliciousHandler,
  fetchMaliciousHandler,
} from "../controllers/maliciousFormatsController";
import { trackClick } from "../controllers/trackingController";
import { sendgridWebhookHandler } from '../controllers/webhookController';
import authenticate from "../middlewares/authMiddleware";


const router = express.Router();

// Sign-Up Route
router.post("/signup", validateSignup, signup);

// Login Route
router.post("/login", login);

// Route to add a contact (protected)
router.post("/contacts", authenticate, createContactHandler);

// Route to get contacts with pagination (protected)
router.get("/contacts", authenticate, fetchContactsHandler);

router.put("/contacts/:contactId", authenticate, editContactHandler);

router.delete("/contacts/:contactId", authenticate, deleteContactHandler);

router.get("/main", authenticate, fetchContactsHandler);

router.get("/statistics", authenticate, fetchContactsHandler);

// Route to send phishing emails
router.post("/send-phishing", authenticate, sendEmailHandler);

// Route to track clicks
router.get("/track/:trackingId/:contactId", trackClick); // This is the tracking link that will be clicked by the user

// hook from send grid that should give us data about clicks
router.post("/sendgrid-webhook", sendgridWebhookHandler); // This not work anymore

// Route to add a malicious message (protected)
router.post("/malicious", authenticate, createMaliciousHandler);

// Route to get malicious message's (protected)
router.get("/malicious", authenticate, fetchMaliciousHandler);

// Route to edit a malicious message (protected)
router.put("/malicious/:maliciousId", authenticate, editMaliciousHandler);

// Route to delete a malicious message (protected)
router.delete("/malicious/:maliciousId", authenticate, deleteMaliciousHandler);

export default router;
