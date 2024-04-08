import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/Context";

const ClientsTable = ({
  dilivery,
  car_num,
  client_name,
  address,
  setModalChange,
  setDeliveryChange,
}) => {
  const { deliverysClients, checkedDelivery, setDeleteOpen, setIdDelete } =
    useContext(UserContext);
  return (
    <table className="mt-5 tableclient">
      <thead>
        {car_num ? (
          <tr>
            <th>{dilivery}</th>
            <th>{car_num}</th>
            <th>{client_name}</th>
            <th></th>
          </tr>
        ) : (
          <tr>
            <th>{client_name}</th>
            <th>{address}</th>
            <th></th>
          </tr>
        )}
      </thead>
      <tbody>
        {car_num ? (
          Object.keys(checkedDelivery).length !== 0 ? (
            <tr>
              <td>{checkedDelivery.username}</td>
              <td>{checkedDelivery.carNumber}</td>
              <td>
                {deliverysClients.length == 0
                  ? "Нету"
                  : deliverysClients.length}
              </td>
              <td>
                <div className="flex">
                  <svg
                    className="mr-10"
                    width="24"
                    height="23"
                    viewBox="0 0 24 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      setIdDelete(checkedDelivery.id);
                      setDeleteOpen(true);
                    }}
                  >
                    <path
                      d="M19 3.83333H15.5L14.5 2.875H9.5L8.5 3.83333H5V5.75H19M6 18.2083C6 18.7167 6.21071 19.2042 6.58579 19.5636C6.96086 19.9231 7.46957 20.125 8 20.125H16C16.5304 20.125 17.0391 19.9231 17.4142 19.5636C17.7893 19.2042 18 18.7167 18 18.2083V6.70833H6V18.2083Z"
                      fill="#D12C2C"
                    />
                  </svg>
                  <svg
                    width="24"
                    height="23"
                    viewBox="0 0 24 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      setDeliveryChange(checkedDelivery);
                      setModalChange(true);
                    }}
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5 19.1666H19C19.2652 19.1666 19.5196 19.2676 19.7071 19.4473C19.8946 19.627 20 19.8708 20 20.125C20 20.3791 19.8946 20.6229 19.7071 20.8026C19.5196 20.9823 19.2652 21.0833 19 21.0833H5C4.73478 21.0833 4.48043 20.9823 4.29289 20.8026C4.10536 20.6229 4 20.3791 4 20.125C4 19.8708 4.10536 19.627 4.29289 19.4473C4.48043 19.2676 4.73478 19.1666 5 19.1666ZM4 14.375L14 4.79163L17 7.66663L7 17.25H4V14.375ZM15 3.83329L17 1.91663L20 4.79163L17.999 6.70925L15 3.83329Z"
                      fill="#00A811"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          ) : (
            <tr className="mt-4 mb-4">
              <div>Выберите доставщика</div>
            </tr>
          )
        ) : (
          deliverysClients.map((delivery) => {
            return (
              <tr>
                <td>{delivery.username}</td>
                <td>{delivery.address}</td>
                <td>
                  <div className="flex">
                    <svg
                      className="mr-10"
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        setIdDelete(delivery.id);
                        setDeleteOpen(true);
                      }}
                    >
                      <path
                        d="M19 3.83333H15.5L14.5 2.875H9.5L8.5 3.83333H5V5.75H19M6 18.2083C6 18.7167 6.21071 19.2042 6.58579 19.5636C6.96086 19.9231 7.46957 20.125 8 20.125H16C16.5304 20.125 17.0391 19.9231 17.4142 19.5636C17.7893 19.2042 18 18.7167 18 18.2083V6.70833H6V18.2083Z"
                        fill="#D12C2C"
                      />
                    </svg>
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        setDeliveryChange(delivery);
                        setModalChange(true);
                      }}
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5 19.1666H19C19.2652 19.1666 19.5196 19.2676 19.7071 19.4473C19.8946 19.627 20 19.8708 20 20.125C20 20.3791 19.8946 20.6229 19.7071 20.8026C19.5196 20.9823 19.2652 21.0833 19 21.0833H5C4.73478 21.0833 4.48043 20.9823 4.29289 20.8026C4.10536 20.6229 4 20.3791 4 20.125C4 19.8708 4.10536 19.627 4.29289 19.4473C4.48043 19.2676 4.73478 19.1666 5 19.1666ZM4 14.375L14 4.79163L17 7.66663L7 17.25H4V14.375ZM15 3.83329L17 1.91663L20 4.79163L17.999 6.70925L15 3.83329Z"
                        fill="#00A811"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default ClientsTable;
