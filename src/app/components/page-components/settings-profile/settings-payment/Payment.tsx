import React from 'react';
import styles from "./styles.module.scss";
import Image from 'next/image';
import CardIcon from "../../../assets/payCard.svg";
import SecureIcon from "../../../assets/lock.svg";
import CartIcon from "../../../assets/cart.svg";
import { FaAngleRight } from 'react-icons/fa';
import { RxCrossCircled } from "react-icons/rx";
import editIcon from "../../../assets/edit.svg";
import PaymentTable from './payment-table/PaymentTable';
import DownloadIcon from "../../../assets/downloadIcon.svg";


const Payment = () => {
  return (
    <div className={styles.paymentCont}>
      <div className={styles.paymentHeader}>
        <p className={styles.Headertxt}>Payment settings</p>
        <p className={styles.txtBody}>Manage your payment and billing preferences here</p>
      </div>

      <div className={styles.paymentsBody}>
        <div className={styles.paymentsmethodCont}>
          <div className={styles.paymentsheader}>
            <Image src={CardIcon} width={16} height={16} alt='none' className={styles.payImg}/>
            <div className={styles.payHeadcont}>
              <div className={styles.leftcont}>
              <p className={styles.Headcont}>Payment Method</p>
              <p className={styles.txtBody}>Add or change your billing method</p>
              </div>
              <div className={styles.rightcont}>
               <Image src={SecureIcon} width={14} height={14} alt='none' />
               <p className={styles.bodytxt}>SECURED</p>
              </div>
            </div>
          </div>
          <div className={styles.inputBoxcont}>
          <div className={styles.paymentInputWrapper}>
            <p>Name On Card</p>
            <input type="text" placeholder='John Doe' className={styles.inputBox}/>
          </div>
          <div className={styles.paymentInputWrapper}>
            <p>Card Number</p>
            <input type="text" placeholder='9999 9999 9999 9999' className={styles.inputBox}/>
          </div>

          <div className={styles.paymentInputBoxCont}>
          <div className={styles.paymentInputWrapper1}>
            <p>Expiry</p>
            <input type="text" placeholder='20/12' className={styles.inputBox}/>
          </div>
          <div className={styles.paymentInputWrapper1}>
            <p>CVV</p>
            <input type="text" placeholder='***' className={styles.inputBox}/>
          </div>
          </div>
          </div>
          <div className={styles.btncont}>
          <button className={styles.savebtn}>SAVE CARD</button>
          <button className={styles.normalbtn}>view other payment methods <FaAngleRight className={styles.rightArrowIcon}/> </button>
          </div>
        </div>
        <div className={styles.cancelsubcont}>
          <div className={styles.paymentsheader}>
            <Image src={CartIcon} width={15} height={15} alt='none' className={styles.payImg}/>
            <div className={styles.payHeadcont}>
              <div className={styles.leftcont}>
              <p className={styles.Headcont}>Current Subscription</p>
              <p className={styles.txtBody}>View and edit your subscription here</p>
              </div>
            </div>            
          </div>

          <div className={styles.cancelcont}>
            <div className={styles.upperdata}>
              <div className={styles.upperleftcont}><span>Free</span><div className={styles.planName}>Sample Plan Name</div></div>
              <div className={styles.upperrightcont}><p>$9999.99 /</p> <span>Month</span></div>
            </div>
            <div className={styles.lowerdata}><Image src={editIcon} width={15} height={15} alt='none' className={styles.editIcon}/> change plan</div>
          </div>

          <div className={styles.cancelcont1}>
          <div className={styles.upperdata}>
              <div className={styles.upperleftcont}><span>Next Renewal</span><div className={styles.planName}>May 02, 2025</div><div className={styles.amount}><p>$9999.99 /</p> <span>Month</span></div></div>
              <div className={styles.upperrightcont}><Image src={CardIcon} width={15} height={15} alt='none' className={styles.cardIcon}/><span>priy**r</span></div>
            </div>
            <div className={styles.lowerdata}><Image src={editIcon} width={15} height={15} alt='none' className={styles.editIcon}/> Change payment method</div>
          </div>





          <div className={styles.btncont1}>
          <button className={styles.normalbtn}>View all upcoming payments <FaAngleRight className={styles.rightArrowIcon}/> </button>
          <button className={styles.normalbtn1}> <RxCrossCircled className={styles.circleCrossIcon}/> Cancel subscription </button>
          </div>
        </div>
      </div>

      <div className={styles.parentsTable}>
      <div className={styles.paymentsheader}>
            <Image src={CardIcon} width={16} height={16} alt='none' className={styles.payImg}/>
            <div className={styles.payHeadcont}>
              <div className={styles.leftcont}>
              <p className={styles.Headcont}>Payment History</p>
              <p className={styles.txtBody}>This is a sample one liner</p>
              </div>
              <div className={styles.rightcont}>
               <Image src={DownloadIcon} width={14} height={14} alt='none' />
               <p className={styles.bodytxt2}>DOWNLOAD</p>
              </div>
            </div>
          </div>
        <PaymentTable/>
      </div>
    </div>
  )
}

export default Payment