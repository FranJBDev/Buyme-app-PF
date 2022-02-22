const { Router } = require("express");
const router = Router();
const bodyParser = require("body-parser");
// const { SELLER_ACCESS_TOKEN } = process.env;

//llamas a la sdk de mercadopago ya instalada
const mercadopago = require("mercadopago");
const showErrors = require("../../messageConsole");
// const createInvoiceDB = require("../../controllers/mercadopago/createInvoiceMP.controller");

router.use(bodyParser.urlencoded({ extended: false }));

//Agregar credenciales de mercado pago   credencial de prueba (pero produccion) del vendedor
mercadopago.configure({
  access_token: 'APP_USR-795368609311295-020422-fae769e7be0de3e4c4c28f63f524af45-1068887150',
});



router.post("/", async (req, res) => {
  // Crea un objeto de preferencia que se envia a mercado pago
  
 let {clientId, itemsHard, valor} = req.body;

//  let [id, title, unit_price, quantity] = itemsHard
 
 if(!itemsHard || itemsHard !== undefined){
  console.log('mpAccess.route', itemsHard)
    let itemsMp = itemsHard.map(e => {
      return{
        title: e.title,
        unit_price: parseFloat(e.unit_price),
        quantity: parseInt(e.quantity)
      }
  } )
  itemsHard = itemsMp;
    try {
      let preference = {
        binary_mode: true, 
        statement_descriptor: "Buyme App Shop",
        items: itemsHard,
        shipments: {
          cost: 100,
          mode: "not_specified",
        }, 
        back_urls: {
          failure: "http://localhost:3000/failure",
          success: "http://localhost:3000/success", //     ANDUVO TODO OK
        },
        auto_return: "approved",
      };
      mercadopago.preferences
        .create(preference)
        .then(function (response) {
          res.json({url: response.body.init_point, 
                    clientId: clientId,
                    itemsHard: itemsHard,
                    valor: valor }); //se usa el init point de producttion
        })
        .catch(function (error) {
          console.log('generacion de preferencia', error);
        });
    } catch (e) {
      showErrors("/mp", e);
      return 404;
    }
 }
});

module.exports = router;



