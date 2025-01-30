
import { StatusScreen } from '@mercadopago/sdk-react';

const ConfirmationComponent = (props) => {


    const initialization = {
        paymentId: props.paymentId, // id de pago para mostrar
    };

    const customization = {
        visual: {
            hideStatusDetails: true,
            hideTransactionDate: true,
            style: {
                theme: 'default', // 'default' | 'dark' | 'bootstrap' | 'flat'
            }
        }
    }

    const onError = async (error) => {
        // callback llamado solicitada para todos los casos de error de Brick
        console.log(error);
    };
    const onReady = async () => {
        /*
          Callback llamado cuando Brick está listo.
          Aquí puede ocultar cargamentos de su sitio, por ejemplo.
        */
    };

    return (
        <StatusScreen
            locale='es'
            initialization={initialization}
            customization={customization}
            onReady={onReady}
            onError={onError}
        />
    )
}

export default ConfirmationComponent;