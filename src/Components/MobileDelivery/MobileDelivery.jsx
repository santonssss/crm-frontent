import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/Context";
import { TailSpin } from "react-loader-spinner";
import MobileModalDelivery from "../../Modals/MobileModalDelivery/MobileModalDelivery";
import MobileModalClientHistory from "../../Modals/MobileModalClientHistory/MobileModalClientHistory";

const MobileDelivery = () => {
  const { setDeliveryOpen, deliveryData, setDevId } = useContext(UserContext);
  const role = localStorage.getItem("role");
  const [atDel, setDet] = useState({});
  const [openTheMod, setTheMod] = useState(false);
  const [openTheModHis, setTheModHis] = useState(false);
  const [clienHistory, setClient] = useState({});
  const deliveryMen = deliveryData.filter((user) => {
    if (role === "root") {
      return user.role === "deliveryman";
    }
  });
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-center mb-4">Доставщики</h2>
      {deliveryMen.length > 0 ? (
        deliveryMen.map((delivery) => {
          const totalDebts = delivery.clientsAsDeliveryman.reduce(
            (accumulator, client) => accumulator + client.profile.debts,
            0
          );
          const formatter = new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
          });
          const formattedTotalDebts = formatter.format(totalDebts);
          return (
            <div
              className="bg-white shadow rounded mb-3 p-3 flex items-center justify-between"
              onClick={() => {
                setDet(delivery);
                setDevId(delivery.id);
                setTheMod(true);
              }}
              key={delivery.id}
            >
              <div>
                <div className="font-medium">{delivery.username}</div>
                <div className="text-sm text-gray-600">
                  {delivery.clientsAsDeliveryman.length} клиент(ов)
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Долги:</div>
                <div className="font-medium">{formattedTotalDebts}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500">
          Добавьте доставщиков чтобы видеть их в списке
        </div>
      )}
      {openTheMod && (
        <MobileModalDelivery
          setTheMod={setTheMod}
          atTheMomentDelivery={atDel}
          setAtTheMomentClient={setClient}
          setOpenHistory={setTheModHis}
        />
      )}
      {openTheModHis && (
        <MobileModalClientHistory
          atTheMomentClient={clienHistory}
          setOpenHistory={setTheModHis}
        />
      )}
    </div>
  );
};

export default MobileDelivery;
