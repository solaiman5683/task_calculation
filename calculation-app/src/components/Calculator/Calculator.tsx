import React from 'react';
import style from './style.module.css';

const Calculator = () => {
	const [calcInput, setCalcInput] = React.useState({
		number1: '',
		number2: '',
	});
	const [calcResult, setCalcResult] = React.useState('');

	const handleSubmit = () => {
		fetch(`${process.env.REACT_APP_API_LINK}/sum`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(calcInput),
		})
			.then(res => res.json())
			.then(data => {
				setCalcResult(data.result);
			});
	};

	return (
		<div className={style.CalcMain}>
			<h3 className={style.CalcHeadText}>Enter the numbers</h3>
			<div className={style.CalcInput}>
				<input
					type='number'
					value={calcInput.number1}
					onChange={e =>
						setCalcInput(prev => {
							return {
								...prev,
								number1: e.target.value,
							};
						})
					}
					placeholder='number 1'
				/>
				<input
					type='number'
					value={calcInput.number2}
					onChange={e =>
						setCalcInput(prev => {
							return {
								...prev,
								number2: e.target.value,
							};
						})
					}
					placeholder='number 2'
				/>
				<input
					type='submit'
					value='Sum'
					onClick={handleSubmit}
					className={style.submitSum}
				/>
			</div>
			<hr className={style.line} />
			<h3 className={style.CalcResultText}>Results</h3>
			<div className={style.CalcResult}>
				<input type='text' disabled value={calcResult} />
			</div>
		</div>
	);
};

export default Calculator;
