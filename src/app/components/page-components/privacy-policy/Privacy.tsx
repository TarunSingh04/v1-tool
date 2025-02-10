import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import sectionHeaderIcon from "../../assets/sectionNameIcon.svg";

const Privacy = () => {
  return (
    <div className={styles.privacyPage}>
      <div className={styles.sectionHeader}>
        <Image src={sectionHeaderIcon} width={18} height={18} alt="none" />
        <p>
          <span>/</span>Privacy Policy
        </p>
      </div>
      <div className={styles.titleheader}>
        <div className={styles.maintitle}>Privacy Policy</div>
        <div className={styles.subdesc}>Your Roadmap to Sustainability</div>
      </div>
      <div className={styles.containerBody}>
        <div className={styles.maincontainertitle}>Privacy Policy</div>
        <div className={styles.containerdesc}>
          This privacy policy was last updated on June 13th, 2024. IMPAKTER PRO
          (represented by: IMPAKTER Limited.) is strongly committed to
          protecting your privacy and the confidentiality of your personal data.
          This privacy statement (“Privacy Statement”) explains what kind of
          personal data IMPAKTER PRO, how IMPAKTER PRO processes it, and for
          what purposes. We comply with laws and regulations that apply to us,
          including the General Data Protection Regulation (hereinafter:
          “GDPR”). We support the notion that you should be in control of your
          personal data. Therefore, we inform you as well as possible about our
          processing activities and your rights with respect to your data, using
          clear and plain language. If you still have any questions, please
          contact IMPAKTER PRO via impakter.pro@gmail.com
        </div>
        <div className={styles.containerdesc}>
          <div className={styles.maincontainertitle2}>
            Our purposes and legal basis for processing personal data
          </div>
          Personal data is data that can be used to identify or contact an
          individual person. Which of your data we may process and why depends
          on how you choose to interact with us and the context in which you
          provide information to us. In general, we process personal data for
          the following purposes: to enable you to contact us and request
          services; to invite customers to meetings; to fill the sustainability
          reports; to create a communication strategy and content part of the
          subscription; if you have subscribed to our newsletter, to send you
          electronic messages to keep you up to date about our commercial
          developments and offers; to send you invites for program events;
          and/or to prepare or perform an agreement with your company.
        </div>

        <div className={styles.containerdesc}>
          <div className={styles.maincontainertitle2}>Legal basis</div>
          We ask you for certain personal data, for example when you send us
          data to fill our report. Which of your personal data we may process
          (and why) depends on the context in which you provide information to
          us and how you choose to interact with us. In general, your personal
          data can include your: name; e-mail address; telephone number;
          address; company name; any additional information that you give us The
          personal data that we collect is provided by you, collected
          automatically, publicly available, and/or provided by third parties to
          us.
        </div>
        <div className={styles.containerdesc}>
          <div className={styles.maincontainertitle2}>Personal data</div>
          Our processing activities are based on different legal grounds.
          IMPAKTER PRO collects and processes your personal data for the
          performance of an agreement with you, to comply with legal
          obligations, based on your consent and/or based on its legitimate
          interest as set out in the purposes above.
        </div>
        <div className={styles.containerdesc}>
          <div className={styles.maincontainertitle2}>Newsletter</div>
          You have the option to receive our newsletter with information about
          developments (of our company) and about our services. Each newsletter
          has the option to unsubscribe. When you subscribe to our newsletter,
          your subscription will remain active until you unsubscribe.
        </div>
        <div className={styles.containerdesc}>
          <div className={styles.maincontainertitle2}>Contact form</div>
          To enable you to contact us with a question or request, we published
          our contact details and a contact form on our website. Any information
          that is provided by you will be used to respond to your question. We
          will do our best to respond in a helpful manner.
        </div>
        <div className={styles.containerdesc}>
          <div className={styles.maincontainertitle2}>Retention period</div>
          IMPAKTER PRO will retain your personal data for as long as we deem it
          necessary to enable you to use our services, comply with applicable
          laws, resolve disputes with any parties, and otherwise as necessary to
          allow us to conduct our business. All personal data we retain will be
          subject to this Privacy Statement. If you have a question about a
          specific retention period for certain types of personal data we
          process about you, please contact us via the contact details provided
          below.
        </div>
        <div className={styles.containerdesc}>
          <div className={styles.maincontainertitle2}>Third parties</div>
          We can engage third parties to which we may disclose or transfer your
          personal data. In case these third parties process your personal data
          while performing services for us, we will be responsible for
          processing your personal data as a controller. For processing your
          personal data as described in this Privacy Statement, we may disclose
          your personal data to the following parties: our accountants and
          advisors; partners of IMPAKTER PRO. Where applicable, we have agreed
          upon a data processing agreement with the relevant third party as
          mentioned above. We will not disclose or transfer your personal data
          to third parties for commercial purposes. Only if the law obliges us
          to do so, we may provide your personal data to regulators and/or (tax)
          authorities. In all cases, we will take appropriate measures to
          guarantee the confidentiality and security of your personal data as
          much as possible.
        </div>
        <div className={styles.containerdesc}>
          <div className={styles.maincontainertitle2}>Security</div>
          We have put appropriate (technical) and organizational measures in
          place to protect the confidentiality and security of information with
          regard to your personal data. Access to such information is limited
          and policies and procedures are in place, designed to safeguard the
          information from loss, misuse, and improper disclosure.
        </div>
        <div className={styles.containerdesc}>
          <div className={styles.maincontainertitle2}>
            Changes to this Privacy Statement{" "}
          </div>
          We reserve the right to change this policy. We may periodically
          change, modify, add, remove, or otherwise update this Privacy
          Statement from time to time by posting a new Privacy Statement on this
          website. Therefore, we recommend consulting this Privacy Statement
          regularly, so that you are aware of these amendments.
        </div>
        <div className={styles.containerdesc}>
          <div className={styles.maincontainertitle2}>
            Your rights with respect to your data
          </div>
          Under the GDPR, you have the right to (request us): access to your
          personal data; have us correct your personal data, for example, if
          your personal data is not accurate; have us erase your personal data
          (if it is no longer needed); restrict us from processing your personal
          data; revoke your consent for processing; an electronic copy of your
          personal data (data portability); object to processing your personal
          data; and If you wish to exercise any of the rights set out above,
          please contact us via the contact details stated below. We may ask you
          to provide proper proof of your identity in order to prevent somebody
          from pretending to be you and thus getting access to your data
        </div>
        <div className={styles.containerdesc}>
          <div className={styles.maincontainertitle2}>
            National supervisory authority
          </div>
          If you have any complaints about how we process your personal data, we
          will do our best to help you effectively. In accordance with UK
          privacy laws and regulations, you have the right to report a complaint
          to the national supervisory authority. You can contact the{" "}
          <a
            href="https://ico.org.uk/"
            target="_blank"
            className={styles.privacyLink}
          >
            UK GDPR
          </a>{" "}
          here.
        </div>
        <div className={styles.containerdesc2}>
          <div className={styles.maincontainertitle2}>
            Questions and contact details
          </div>
          If you have any questions about this Privacy Statement, the way we
          process your personal data, or if you wish to submit a request in
          order to exercise your rights as stated in this Privacy Statement, or
          if you have any other privacy-related question please contact us:
          
          <p className={styles.CompanyInfo1}><span>Company name:</span> IMPAKTER Limited </p>
          <p className={styles.CompanyInfo2}><span> Website:</span> impakter.com/pro</p>
          <p className={styles.CompanyInfo2}><span>E-mail address:</span>impakter.pro@gmail.com </p>
          <p className={styles.CompanyInfo2}><span>Address:</span> 32 Lots Road, London SW10 0QJ,United Kingdom</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
