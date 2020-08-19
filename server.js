import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import env from './env';
import usersRoute from './app/routes/userRoute';
import storyRoute from './app/routes/storyRoute';
import shopRoute from './app/routes/shopRoute';
import destinationRoute from './app/routes/destinationRoute';
import eventRoute from './app/routes/eventRoute';




const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/api', usersRoute);
app.use('/api', storyRoute);
app.use('/api', eventRoute);
app.use('/api', shopRoute);
app.use('/api', destinationRoute);


app.listen(env.port).on('listening', () => {
  console.log(`Listening on ${env.port}`);
});


export default app;