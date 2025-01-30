import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const MercadoPagoButton = () => {
  // Inicializar Mercado Pago con tu Public Key
  useEffect(() => {
    initMercadoPago('TESTUSER857296118');
  }, []);

  return (
    <div>
      <Wallet initialization={{ preferenceId }} />
    </div>
  );
};

export default MercadoPagoButton;
