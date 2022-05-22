import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

// initialize the express app
const app = express();

// set the middleware
app.use(express.json());
app.use(cors());

// connect to mongodb database using mongoose
mongoose.connect(
	'mongodb+srv://bullnice:test123456@cluster0.p4naa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	() => {
		console.log('Connected to mongodb');
	}
);

// create monogoose schema
const resultSchema = new mongoose.Schema({
	number1: Number,
	number2: Number,
	result: Number,
});

// create mongoose model
const Result = mongoose.model('Result', resultSchema);

// Initialize sum function
const sum = (a: number, b: number): number => a + b;

// API Endpoints
app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send('Hello World!');
});

app.post('/sum', (req: Request, res: Response, next: NextFunction) => {
	const a = parseInt(req.body.number1);
	const b = parseInt(req.body.number2);
	const result = sum(a, b);
	// result save to database
	const newResult = new Result({
		number1: a,
		number2: b,
		result: result,
	});
	newResult.save();

	res.json({ result });
});

// get all results
app.get('/results', (req: Request, res: Response, next: NextFunction) => {
	Result.find({}, (err: any, results: any) => {
		if (err) {
			res.json({ message: err });
		} else {
			res.json({ results });
		}
	});
});

// Run the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
