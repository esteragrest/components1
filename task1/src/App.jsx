import styles from './app.module.css';
import './index.css';
import { useState } from 'react';
import { dateFormat } from './utils/dateFormat';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValueVaild, setIsValueVaild] = useState(false);
	const [date, setDate] = useState('');

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение:');
		const dateNow = dateFormat(new Date());
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			setIsValueVaild(false);
			return;
		}
		setValue(promptValue);
		setError('');
		setIsValueVaild(true);
		setDate(dateNow);
	};

	const onAddButtonClick = () => {
		const updatedList = [...list, { id: Date.now(), value: value, date: date }];
		setList(updatedList);
		setValue('');
		setError('');
		setIsValueVaild(false);
		setDate('');
	};

	const listHtml = (
		<ul className={styles.list}>
			{list.map((item) => (
				<li className={styles['list-item']} key={item.id}>
					{item.value} дата добавления: {item.date}
				</li>
			))}
		</ul>
	);
	const listTextHtml = (
		<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
	);

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>:{' '}
				{<output className="current-value">{value}</output>}
			</p>
			{error !== '' && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueVaild}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length > 0 ? listHtml : listTextHtml}
			</div>
		</div>
	);
};
