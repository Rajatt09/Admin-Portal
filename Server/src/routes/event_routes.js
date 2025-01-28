import express from 'express';
import { postCreateEvent } from '../controllers/event_controller.js';
import { upload2 } from '../middleware/multer2.js';
import Event from '../models/event_model.js';

const router = express.Router();

router.post('/eventPost', upload2.array('files'), postCreateEvent);
router.get('/events', async (req, res) => {
    try {
      const events = await Event.find(); // Fetch all events
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error });
    }
  });



export default router;