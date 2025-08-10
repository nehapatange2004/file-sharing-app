import express from 'express';
import Asset from '../models/Asset.js';
import path from 'path';
import multer from 'multer';
import mongoose from 'mongoose';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { mkdir } from 'fs';
import fs from "fs";
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join('uploads', `${req.user._id}-${req.user.name}`);

    // Make folder if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath); // callback function to save file at uploads folder to save files (create if not exists)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);   //callback function to name the file
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit (optional)
});


const fileRouter = express.Router();

fileRouter.get('/public', async (req, res) => {
  try {
    const allPublicAssets = await Asset.find({isPublic: true});
    

    // Access control: check if user owns file or file is public
    

    // Absolute file path
    // const absolutePath = path.resolve(file.path);

    
    // res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);

    // res.setHeader('Content-Disposition', 'inline');   //to avoid automatic downloading of the file.
    // res.setHeader('Content-Type', file.mimeType);     //type of file being sent eg imge/png etc...

    // Stream the file to the client
    // res.sendFile(absolutePath);
    res.json(allPublicAssets);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
fileRouter.post('/user-private', protectedRoute, async (req, res) => {
   try {
    

    const allUserAssets = await Asset.find({
      ownerId: req.user._id.toString()
    });


    res.json(allUserAssets);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

fileRouter.get('/metadata/:id', async (req, res) => {
  const file = await Asset.findById(req.params.id);
  if (!file) return res.status(404).json({ error: 'File not found' });

  res.json({
    id: file._id,
    originalName: file.originalName,
    mimeType: file.mimeType,
    size: file.size,
    previewUrl: `/files/${file._id}`,   // Your existing file serving route
  });
});

// actual file is sent!



fileRouter.post('/upload/:isPublic', protectedRoute, upload.single('file'), async (req, res) => {
  try {
    const file = req.file; // multer puts file info here
    if (!file) return res.status(400).send('No file uploaded');

    // Save metadata to DB
    const asset = new Asset({
      // ownerId: req.user._id,             // Assuming you have user auth
      ownerId: req.user._id,
      originalName: file.originalname,
      storedName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      path: path.resolve(file.path),
      isPublic: req.params.isPublic=="true"?true:false,                   // visibility /access control
      createdAt: new Date(),
    });

    await asset.save();

    res.json({ message: 'File uploaded', asset });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


fileRouter.get('/:id', async (req, res) => {
  try {
    const file = await Asset.findById(req.params.id);
    if (!file) return res.status(404).send('Asset not found');

    // Access control: check if user owns file or file is public
    // if (!file.isPublic && (!req.user || req.user._id.toString() !== file.ownerId.toString())) {
    //   return res.status(403).send('Not authorized to access this file');
    // }

    // Absolute file path
    const absolutePath = path.resolve(file.path);

    
    // res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);

    res.setHeader('Content-Disposition', 'inline');   //to avoid automatic downloading of the file.
    res.setHeader('Content-Type', file.mimeType);     //type of file being sent eg imge/png etc...

    // Stream the file to the client
    res.sendFile(absolutePath);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
// fileRouter.post('/:id', async (req, res) => {
//   try {
//     const file = await Asset.findById(req.params.id);
//     if (!file) return res.status(404).send('Asset not found');

//     // Access control: check if user owns file or file is public
//     if (!file.isPublic && (!req.user || req.user._id.toString() !== file.ownerId.toString())) {
//       return res.status(403).send('Not authorized to access this file');
//     }

//     // Absolute file path
//     const absolutePath = path.resolve(file.path);

    
//     // res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);

//     res.setHeader('Content-Disposition', 'inline');   //to avoid automatic downloading of the file.
//     res.setHeader('Content-Type', file.mimeType);     //type of file being sent eg imge/png etc...

//     // Stream the file to the client
//     res.sendFile(absolutePath);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

export default fileRouter;
