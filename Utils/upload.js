import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();
const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;



const storage = new GridFsStorage({
   url: `mongodb+srv://${username}:${password}@cluster0.nqh9aro.mongodb.net/?retryWrites=true&w=majority`,
   options: { useNewUrlParser: true , useUnifiedTopology: true ,
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    socketTimeoutMS: 45000},
   file: (req, file , email ) => {
    const userEmail = email  || req.body.email;

      console.log("sdfds" , userEmail)
      return {
        bucketName: 'photos',
        filename: `${Date.now()}-blog-${file.originalname}`,
        metadata: {
          email: userEmail,
        },
      };
    },
  });


export default multer({storage});