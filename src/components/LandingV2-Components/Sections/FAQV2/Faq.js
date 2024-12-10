//- Import React
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import useResizeAware from 'react-resize-aware';

//- Import Styles
import { StyledFaq } from './Faq-Styles';
import styles from './Faq.module.css';

//- Import Images
import Triangle from './assets/Triangle.png';
import TriangleOpen from './assets/TriangleOpen.png';

const FaqSection = (props) => {
	const { question, answer } = props;
	const [isOpen, toggleOpen] = useState(false);
	const [resizeListener, { height }] = useResizeAware();

	const animProps = useSpring({
		height: isOpen ? height : 0,
		opacity: isOpen ? 1 : 0,
	});

	return (
		<StyledFaq onClick={() => toggleOpen(!isOpen)}>
			<div className="faq-question">
				<span>
					<p className={styles.Question}>
						{isOpen ? (
							<img className={styles.ImgOpen} src={TriangleOpen} />
						) : (
							<img className={styles.Img} src={Triangle} />
						)}
						{question}
					</p>
				</span>
			</div>

			<animated.div className="faq-answer" style={{ ...animProps }}>
				<span style={{ position: 'relative' }}>
					{resizeListener}
					<p className={styles.Answer}>{answer}</p>
				</span>
			</animated.div>
		</StyledFaq>
	);
};

export default FaqSection;
