import React, { useContext } from "react";
import "./ClientsRight.css";
import CustomButton from "../../Decomponents/CustomButton";
import ClientsTable from "../../Decomponents/ClientsTable";
import { UserContext } from "../../Context/Context";
const ClientsRight = ({ setModalChange, setDeliveryChange }) => {
  const { setAddClientsOpen, setAddDeliveryOpen } = useContext(UserContext);
  const role = localStorage.getItem("role");
  return (
    <div className="client-right">
      {role !== "optometrist" && (
        <>
          <CustomButton onClick={() => setAddDeliveryOpen(true)}>
            Доставщики <span>+</span>
          </CustomButton>
          <ClientsTable
            dilivery={"Доставщик"}
            tel={"Номер телефона"}
            car_num={"Номер машины"}
            client_name={"Клиенты"}
            setModalChange={setModalChange}
            setDeliveryChange={setDeliveryChange}
          />
        </>
      )}
      <CustomButton className="mt-5" onClick={() => setAddClientsOpen(true)}>
        Клиенты <span>+</span>
      </CustomButton>
      <ClientsTable
        address={"Адрес"}
        tel={"Номер телефона"}
        client_name={"Клиенты"}
        setModalChange={setModalChange}
        setDeliveryChange={setDeliveryChange}
      />
    </div>
  );
};

export default ClientsRight;
