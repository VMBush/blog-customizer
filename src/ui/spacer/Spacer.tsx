import styles from './index.module.scss';

type SpacerProps = {
	size?: 4 | 50;
};

export const Spacer = ({ size = 50 }: SpacerProps) => {
	return <div className={styles[`spacer${size}`]}></div>;
};
