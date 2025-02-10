import { Eye, SquareArrowOutUpRight, X } from "lucide-react";
import { PrimaryButton } from "../../../utilities/components/questionnaire/buttons/buttons";
import { Dialog } from "@mui/material";
import EuLabelPicture from "../../../assets/EuLabelPicture.png";
import { useState } from "react";
import Image from "next/image";
import { Divider } from "@mui/joy";

const EuLabelWidget = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = function () {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        PaperProps={
          {
            sx: { borderRadius: "20px" , width: "520px"}
          }
        }
        slotProps={{
          backdrop: {
            style: {
              backgroundColor: "rgba(25, 96, 187, 0.8)",
            },
          },
        }}
      >
        <EuLabel
          onExit={() => {
            closeDialog();
          }}
        />

        <div
          style={{
            margin: "8px 0",
          }}
        >
          <PrimaryButton
          width={"220px"}
            outlined={true}
            label={"Go Back"}
            onClick={() => {
              closeDialog();
            }}
          />
        </div>
      </Dialog>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          gap: 16,
        }}
      >
        <PrimaryButton
          outlined={true}
          hasBorder={false}
          onClick={() => {
            window.open("https://energy-efficient-products.ec.europa.eu/ecodesign-and-energy-label/understanding-energy-label_en","_blank");
          }}
          prefixIcon={<SquareArrowOutUpRight size={15} />}
          label={"LEARN MORE ABOUT ENERGY LABELS"}
        />

        <PrimaryButton
          outlined={true}
          hasBorder={false}
          onClick={() => {
            console.log("Opening Dialog");
            setIsDialogOpen(true);
          }}
          label={"VIEW EU LABELS"}
          suffixIcon={<Eye size={15} />}
        />
      </div>
    </>
  );
};

const EuLabel = (props) => {
  return (
    <>
      <div
        style={{
          height: "86vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          padding: "5px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            width: "100%",
          }}
        >
          <X
            onClick={() => {
              props.onExit();
            }}
            style={{
              cursor: "pointer",
            }}
          />
        </div>
        <div
          style={{
            margin: "10px 0 0 0",
            fontWeight: "600",
            fontSize: "18px",
          }}
        >
          EU Label
        </div>
        <div
          style={{
            padding: "5px 0",
            fontWeight: "400",
            fontSize: "14px",
            color: "grey",
            marginBottom: "8px"
          }}
        >
          EU Label
        </div>
        <Divider />

        <Image
        alt="Eu Label"
          src={EuLabelPicture}
          style={{
            width: "460px",
            height: "70vh",
            objectFit: "contain",
            backgroundColor:"#f9fafc",
            margin:"8px 0",
            borderRadius: "16px"
          }}
        />
      </div>
    </>
  );
};

export default EuLabelWidget;
