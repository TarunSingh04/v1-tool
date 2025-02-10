import styles from "./nav.module.scss";
import { PrimaryButton, SecondaryButton } from "../buttons/buttons";
import { MdArrowBackIos, MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export const Navbar = (props) => {

  const router = useRouter();



  return (
    <>
      <div className={styles.navheader}>
        <SecondaryButton
          disabled={props.onGoBack ? false : true}
          onClick={() => {
            if (props.onGoBack) {
              props.onGoBack();
            }
          }}
          label={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span>
                <MdArrowBackIosNew
                  style={{
                    paddingTop: "2px",
                  }}
                />
              </span>
              <p>GO BACK</p>
            </div>
          }
        />

        <PrimaryButton
          disabled = {props.onSave? false : true}
          onClick={()=>{
            var redirect = props.onSave();
            if (redirect == false){
              return;
            }
            toast.info("Redirecting to Dashboard");
            setTimeout(()=>{

            router.push("/pages/dashboard");;
            }, 1000)
          }}
          checked={true}
          label={"SAVE & EXIT"}
          outlined={true}
        />
      </div>
    </>
  );
};
