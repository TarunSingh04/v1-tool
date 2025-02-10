
import styles from './mobile_warn.module.scss';
import Image from 'next/image';
import pageNotDisplayLogo from '../../../../assets/pageNotDisplayLogo.svg';


export const MobileWarnMessage = () => {
    return <>
        <div className={styles.pageNotDisplay}>
          <Image src={pageNotDisplayLogo} width={160} height={115} alt="none" />
          <p className={styles.pageNotDisplaytitle}>
            Oops! Best Viewed on Desktop
          </p>
          <p className={styles.pageNotDisplaysubtitle}>
            For the Best Experience, Switch to Desktop!
          </p>
          <p className={styles.pageNotDisplaydesc}>
            You&apos;re on a mobile or tablet. For the full experience and all
            site features, please visit us on your desktop.
          </p>
        </div>
      
    </>;
}
