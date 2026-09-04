import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { getAuthUrl, getTokensFromCode, isGoogleDriveConnected, getDriveImages, getDriveImageBuffer } from './googleDriveService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
} else {
  console.log('No MONGODB_URI found. Running in mock backend mode.');
}

// Enquiry Schema (Optional, used if MongoDB is connected)
const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  eventType: { type: String, required: true },
  eventDate: { type: Date, required: true },
  guestCount: { type: Number, required: true },
  location: String,
  preferredMeal: String,
  requirements: String,
  createdAt: { type: Date, default: Date.now }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

// In-memory fallback if no DB
const mockEnquiries = [];

app.post('/api/enquiries', async (req, res) => {
  try {
    const data = req.body;
    
    if (mongoose.connection.readyState === 1) {
      const newEnquiry = new Enquiry(data);
      await newEnquiry.save();
    } else {
      mockEnquiries.push({ ...data, _id: Date.now().toString(), createdAt: new Date() });
    }
    
    res.status(201).json({ message: 'Enquiry submitted successfully' });
  } catch (error) {
    console.error('Error saving enquiry:', error);
    res.status(500).json({ error: 'Failed to submit enquiry' });
  }
});

// Google Drive OAuth Routes
app.get('/api/auth/google', (req, res) => {
  try {
    const url = getAuthUrl();
    res.redirect(url);
  } catch (error) {
    console.error('Error initiating Google OAuth:', error);
    res.status(500).json({ error: 'Failed to initiate Google OAuth' });
  }
});

app.get('/api/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send('Authorization code missing');
  }
  
  try {
    await getTokensFromCode(code);
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${clientUrl}/gallery?connected=true`);
  } catch (error) {
    console.error('Error during Google OAuth callback:', error);
    res.status(500).send('Authentication failed. Check server logs.');
  }
});

app.get('/api/auth/google/status', (req, res) => {
  res.json({
    connected: isGoogleDriveConnected(),
    folderId: process.env.GOOGLE_DRIVE_FOLDER_ID !== 'your_google_drive_folder_id_here' ? process.env.GOOGLE_DRIVE_FOLDER_ID : null
  });
});

app.get('/api/gallery', async (req, res) => {
  try {
    if (!isGoogleDriveConnected()) {
      return res.status(400).json({
        error: 'Google Drive is not connected or configured yet.',
        fallback: true
      });
    }
    const host = req.get('host');
    const protocol = req.protocol;
    const baseUrl = `${protocol}://${host}`;
    const images = await getDriveImages(baseUrl);
    res.json({ images });
  } catch (error) {
    console.error('Failed to get Google Drive images:', error);
    res.status(500).json({
      error: 'Failed to fetch images from Google Drive',
      message: error.message,
      fallback: true
    });
  }
});

app.get('/api/gallery/image/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    const width = req.query.w || '600';
    const { buffer, contentType } = await getDriveImageBuffer(fileId, width);
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    res.send(buffer);
  } catch (error) {
    console.error('Failed to proxy Google Drive image:', error);
    res.status(500).send('Failed to load image');
  }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
