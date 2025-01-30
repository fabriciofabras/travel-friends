import { Payment } from '@mercadopago/sdk-react';
import { initMercadoPago } from '@mercadopago/sdk-react';

export const PaymentComponent = (props) =>{


initMercadoPago('TEST-c6c22da5-fa17-4e4c-a559-16e50d1921a9');

console.log("props",props)
const initialization = {
    amount: props.amount,
    description:props.description,
    preferenceId: "<PREFERENCE_ID>",
  };
  const customization = {
    paymentMethods: {
      atm: "all",
      ticket: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };

    const onSubmit = async (
      { selectedPaymentMethod, formData }
    ) => {
      // callback llamado al hacer clic en el botón enviar datos

      formData.description = props.description;
      console.log(JSON.stringify(formData))
      return new Promise((resolve, reject) => {
        fetch("https://travel-friends-server.vercel.app/process_payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((response) => {
            // recibir el resultado del pago
            resolve();
            console.log("response",response)
            props.setPaymentId(response.payment.id)
            props.handlePago(3)
          })
          .catch((error) => {
            // manejar la respuesta de error al intentar crear el pago
            reject();
          });
      });
    };

    
      const onError = async (error) => {
        // callback llamado para todos los casos de error de Brick
        console.log(error);
      };
      const onReady = async () => {
        /*
          Callback llamado cuando el Brick está listo.
          Aquí puede ocultar cargamentos de su sitio, por ejemplo.
        */
      };

      return (
        <Payment
                locale='es'
                initialization={initialization}
                customization={customization}
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onError}
              />
      )


}

export default PaymentComponent;