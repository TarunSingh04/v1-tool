import React from 'react';
import styles from "./styles.module.scss";
import { useRouter } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa6';

const certificates_Data = [
    {
        certificateName: "flowers and Ornamentals sustainability Standard - KFC Gold and Silver Level",
        maxPrice: 90000,
        minPrice: 5000,
    },
    {
        certificateName: "flowers and Ornamentals sustainability Standard - KFC Gold and Silver Level",
        maxPrice: 90000,
        minPrice: 5000,
    },
    {
        certificateName: "flowers and Ornamentals sustainability Standard - KFC Gold and Silver Level",
        maxPrice: 90000,
        minPrice: 5000,
    },
];

const Finance = () => {
    const router = useRouter();
    const navigatTo = () =>{
      router.push("/pages/mytasks")
    }
    const calculateMean = (data:any, key:any) => {
        const total = data.reduce((sum:any, item:any) => sum + item[key], 0);
        return total / data.length;
    };


    const meanMaxPrice = calculateMean(certificates_Data, 'maxPrice');
    const meanMinPrice = calculateMean(certificates_Data, 'minPrice');

    return (
        <div className={styles.container}>
            <div className={styles.cardheader}>My Savings</div>
            <div className={styles.cumulativeBalance}>
                <div className={styles.priceCont}>    
                    <div className={styles.pricebox}>
                    <p className={styles.amount}>{meanMinPrice.toFixed(0)}<span>€</span></p>
                    <p className={styles.desc}>Lowest Certificate Price</p>
                    </div>
                    <div className={styles.pricebox1}>
                    <p className={styles.amount}>{meanMaxPrice.toFixed(0)}<span>€</span></p>
                    <p className={styles.desc}>Highest Certificate Price</p>
                    </div>
                </div>
            </div>
            <div className={styles.certificatesprice}>
                <div className={styles.certificateBox}>
                    <div className={styles.certificatesdataheader}>
                        <p className={styles.certificatesHead}><span>No.</span> Certificates</p>
                        <div className={styles.certificatespriceHead}>Min price<span>Max price</span></div>
                    </div>
                    {
                        certificates_Data.map((data, index) => {
                            return (
                                <div key={index} className={index===certificates_Data.length-1?styles.certificatesdatafade:styles.certificatesdata}>
                                    <p className={styles.certificateNumber}>0{index+1}.</p> 
                                    <p className={styles.certificatesName}>{data.certificateName}</p>
                                    <div className={styles.certificateAmount}>€ {data.minPrice} <span>€ {data.maxPrice}</span></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={styles.questionairebtn}>
                <button className={styles.questionbtn2} onClick={()=>{navigatTo()}}>View more <FaChevronRight className={styles.btnIcon}/></button>
            </div>
        </div>
    );
}

export default Finance;
