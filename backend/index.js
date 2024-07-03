// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/tasks.js'; 
import dotenv from "dotenv"

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@users.hfmhcva.mongodb.net/TaskDB`; 



// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router); 

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(() => {
    console.log('Connected to MongoDB');
    // Start server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => console.error('Error connecting to MongoDB:', error));
