//- Import React
import React from 'react';
import { data } from './Data';

//- Import Styles
import styles from './Faq.module.css';

//- Components Imports
import Question from './Question';

const FaqSection = ({ id }) => {
	console.log(data);
	return (
		<section className={styles.Container} id={id}>
			<h2 className={styles.Title}>Frequently Asked Questions</h2>
			{data.map((value, i) => {
				return (
					<>
						<Question q={value.question} r={value.answer} />
						<hr className={styles.Hr} />
					</>
				);
			})}
		</section>
	);
};

export default FaqSection;
