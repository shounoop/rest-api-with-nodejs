import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(
	cors({
		credentials: true,
	})
);

app.use(compression());

app.use(cookieParser());

app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
	console.log('Server listening on port 8080');
});

const MONGO_URL =
	'mongodb+srv://shounoop:toikhongnhomk1@cluster0.70yl8em.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (err: Error) => {
	console.error(err);
	console.log('MongoDB connection error. Please make sure MongoDB is running.');
	// process.exit();
});

app.use('/', router());
