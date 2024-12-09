import { useState } from 'react';
import style from './app.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValueVaild, setIsValueVaild] = useState(false);
	const updatedList = [...list, { id: Date.now(), value }];

	const onInputButtonClick = () => {
		const promptValue = prompt();
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			setIsValueVaild(false);
		} else {
			setValue(promptValue);
			setError('');
			setIsValueVaild(true);
		}
	};

	const onAddButtonClick = () => {
		if (value.length >= 3) {
			setList(updatedList);
			setValue('');
			setError('');
			setIsValueVaild(false);
		}
	};

	return (
		<>
			<div className={style['app']}>
				<h1 className={style['page-heading']}>Ввод значения</h1>
				<p className={style['no-margin-text']}>
					Текущее значение <code>value</code>: &quot;
					<output className={style['current-value']}>{value}</output>&quot;
				</p>
				{error !== '' && <div className={style['error']}>{error}</div>}
				<div className={style['buttons-container']}>
					<button className={style['button']} onClick={onInputButtonClick}>
						Ввести новое
					</button>
					<button
						className={style['button']}
						disabled={!isValueVaild}
						onClick={onAddButtonClick}
					>
						Добавить в список
					</button>
				</div>
				<div className={style['list-container']}>
					<h2 className={style['list-heading']}>Список:</h2>
					{list.length === 0 && (
						<p className={style['no-margin-text']}>
							Нет добавленных элементов
						</p>
					)}
					{list.length > 0 && (
						<ul className={style['list']}>
							{list.map(({ id, value }) => (
								<li className={style['list-item']} key={id}>
									{value} |{' '}
									{new Date(id)
										.toISOString()
										.substring(0, 10)
										.split('-')
										.reverse()
										.join('.')}{' '}
									{new Date(id).toISOString().substring(11, 19)}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	);
};
