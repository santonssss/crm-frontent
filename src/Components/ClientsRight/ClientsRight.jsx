import React, { useContext } from "react";
import "./ClientsRight.css";
import CustomButton from "../../Decomponents/CustomButton";
import ClientsTable from "../../Decomponents/ClientsTable";
import { UserContext } from "../../Context/Context";
const ClientsRight = () => {
  const { setAddClientsOpen, setAddDeliveryOpen } = useContext(UserContext);
  return (
    <div className="client-right">
      <CustomButton onClick={() => setAddDeliveryOpen(true)}>
        Доставщики <span>+</span>
      </CustomButton>
      <ClientsTable
        dilivery={"Доставщик"}
        tel={"Номер телефона"}
        car_num={"Номер машины"}
        client_name={"Клиенты"}
      />
      <CustomButton className="mt-5" onClick={() => setAddClientsOpen(true)}>
        Клиенты <span>+</span>
      </CustomButton>
      <ClientsTable
        address={"Адрес"}
        tel={"Номер телефона"}
        client_name={"Клиенты"}
      />
    </div>
  );
};

export default ClientsRight;
