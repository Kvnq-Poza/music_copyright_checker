import express, { json, urlencoded } from 'express';
import cors from 'cors';
import connectDB from './database';
import 'dotenv/config';

import userRoutes from './routes';
import authRoutes from './routes/authRoutes';
import youtubeRoutes from './routes/youtubeRoutes';
import musicRoutes from './routes/musicRoutes';
import tagRoutes from './routes/tagRoutes';

import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*'
}))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/youtube', youtubeRoutes);
app.use('/music', musicRoutes);
app.use('/tags', tagRoutes);

// app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  res.send('Server is running');
});

(async () => {
  await connectDB();


  // Add the provided greenlock-express code here
  // require('greenlock-express')
  //     .init({
  //         packageRoot: path.join(__dirname, '../'),
  //         maintainerEmail: "afaisal3389@gmail.com",
  //         subscriberEmail: "afaisal3389@gmail.com",
  //         configDir: './greenlock.d',
  //         cluster: false
  //     })
  //     .serve(app);

  app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
  });
  // const sslServer = https.createServer({
  //     key: fs.readFileSync(path.join(__dirname, '../cert', 'key.pem')),
  //     cert: fs.readFileSync(path.join(__dirname, '../cert', 'cert.pem')),
  // }, app)
  // sslServer.listen(443, () => {
  //     logger.info(`SSL Server started on ${443}`);
  // });
})();