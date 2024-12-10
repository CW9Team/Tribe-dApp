//- Import React
import React from 'react';

//- Import Accordion
import FaqSection from './Faq';

//- Import Styles
import { StyledFaqsList } from './Faq-Styles';
import styles from './Faq.module.css';

const faqsData = [
	{
		question: 'Where do I buy TRIBEX?',
		answer:
			'Currently you can get TRIBEX through PancakeSwap by buying with BNB.',
	},
	{
		question: 'How to earn rewards by staking?',
		answer:
			'You simply have to visit our staking platform, choose a pool, approve the contract and deposit the amount of TRIBEX you want.',
	},
	{
		question: 'How do I buy TribePops?',
		answer:
			'In order to participate in the TribePops sale, you must be staking TRIBEX in the staking pool. You can also access the "Open Edition" TribePop that does not require TRIBEX staking.',
	},
	{
		question: "I'm a Celebrity / Brand, How do I launch my own TribePop?",
		answer:
			'If you want to launch your own collection of TribePops, simply email us at Info@TribeToken.app or contact one of the moderators at T.me/TribeEN',
	},
];

const FaqList = ({ id }) => {
	return (
		<div className={styles.Container} id={id}>
			<h2 className={styles.Title}>FAQ</h2>
			<StyledFaqsList>
				{faqsData.map((faq, i) => (
					<FaqSection
						key={'faq_' + i}
						question={faq.question}
						answer={faq.answer}
					/>
				))}
			</StyledFaqsList>
		</div>
	);
};

export default FaqList;
