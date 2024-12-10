//- Import React
import React from 'react';

//- Import Styles
import styles from './Apply.module.css';

//- Import Components
import CardNFT from '../../Cards/CardNFT/CardNFT';
import ApplyButton from '../../Buttons/ApplyButton/ApplyButton';

const ApplySection = ({ id }) => {
	return (
		<section className={styles.Container} id={id}>
			<div className={styles.Subcontainer}>
				<div className={styles.TribePopMobile}>
					Apply for your
					<span className={styles.GradientText}> TribePop NFTs </span>
				</div>
				<CardNFT
					name={'The Chad'}
					colection={'Caveman NFT'}
					price={'0.09 BNB'}
					image={'./assets/memepad/nft/Chad.jpg'}
				/>
				<div className={styles.Content}>
					<div className={styles.TribePop}>
						Apply for your
						<span className={styles.GradientText}> TribePop NFTs </span>
					</div>
					<p className={styles.Text}>
						Be an important part of our Marketplace, <br />
						share your creations and shape your future.
					</p>
					<div className={styles.ButtonContainer}>
						<ApplyButton
							text={'Apply Now'}
							onClick={() => {
								window.open('mailto:info@tribetoken.app').focus();
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ApplySection;
