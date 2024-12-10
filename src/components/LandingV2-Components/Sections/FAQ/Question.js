//- React Imports
import React, { useState } from 'react';
import useMeasure from 'react-use-measure';

//- React Spring Imports
import { useSpring, animated } from '@react-spring/web';

//- Styles Imports
import styles from './Question.module.css';

//- Image Imports
import Triangle from './assets/Triangle.png';
import TriangleOpen from './assets/TriangleOpen.png';

const Question = ({ q, r }) => {
	////////////
	// STATES //
	////////////
	const [isOpen, setOpen] = useState(false);

	const toggle = (state) => {
		setOpen(!state);
	};

	const [ref, { height: viewHeight }] = useMeasure();

	///////////////
	// ANIMATION //
	///////////////
	const { height } = useSpring({
		from: { height: 0, opacity: 0, y: 0 },
		to: {
			height: isOpen ? viewHeight : 0,
		},
	});

	////////////
	// RENDER //
	////////////
	return (
		<div className={styles.Container}>
			<button className={styles.Button} onClick={() => toggle(isOpen)}>
				<div>
					{isOpen ? (
						<img className={styles.Img} src={TriangleOpen} />
					) : (
						<img className={styles.Img} src={Triangle} />
					)}
				</div>
				<h3 className={styles.Title}>{q}</h3>
			</button>
			<animated.p
				ref={ref}
				className={styles.Text}
				style={{ height: isOpen ? 'auto' : height }}
			>
				{r}
			</animated.p>
		</div>
	);
};

export default Question;
