//- Import React
import React from 'react';

//- Import Styles
import styles from './Features.module.css';

//- Import Logos
import CelebrityValidated from '../../../../images/CelebrityValidated.png';
import ScheduledBurns from '../../../../images/ScheduledBurns.png';
import MetaverseSkinReady from '../../../../images/MetaverseSkinReady.png';
import StakingRewards from '../../../../images/StakingRewards.png';
import LaunchpadAllocations from '../../../../images/LaunchpadAllocations.png';
import GamificationRigging from '../../../../images/GamificationRigging.png';

const FeatureSection = ({ id }) => {
	return (
		<section className={styles.Container} id={id}>
			<h2>Features</h2>
			<h3>Our NTFs attributes</h3>
			<div className={styles.Cards}>
				<div className={styles.Card}>
					<img src={CelebrityValidated} />
					<span>
						Celebrity <br className={styles.Br} /> Validated
					</span>
				</div>
				<div className={styles.Card}>
					<img src={ScheduledBurns} />
					<span>
						Scheduled <br className={styles.Br} />
						Burns
					</span>
				</div>
				<div className={styles.Card}>
					<img src={MetaverseSkinReady} />
					<span>
						Metaverse <br className={styles.Br} />
						Skin Ready
					</span>
				</div>
				<div className={styles.Card}>
					<img src={StakingRewards} />
					<span>
						Staking <br className={styles.Br} />
						Rewards
					</span>
				</div>
				<div className={styles.Card}>
					<img src={LaunchpadAllocations} />
					<span>
						Launchpad <br className={styles.Br} />
						Allocations
					</span>
				</div>
				<div className={styles.Card}>
					<img src={GamificationRigging} />
					<span>
						Gamification <br className={styles.Br} />
						Rigging
					</span>
				</div>
			</div>
		</section>
	);
};

export default FeatureSection;
