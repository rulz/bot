/**
 * Bot para whatsapp
 * web: https://kuatroestrellas.github.io/blog/
 * responde al hola mundo con un mensaje
 * requiere nodejs v12 o superior y las librerias qrcode-terminal y whatsapp-web.js
 * npm i qrcode-terminal whatsapp-web.js
**/

// code:sendMessage:code
// phone:56984748103@c.us:phone
// msg:
// Recta Final!  ¡últimas horas! Taller de Ejercitación. 🔥

// Matemáticas:  
// - 4 ejes en total: Números, Algebra y Funciones, Geometría, Probabilidades y Estadísticas.
// - Acceso a Slack (Resolución de dudas)
// - 10 clases en vivo de talleres de ejercicios 
// - Material de apoyo descargable: Guías de ejercicios y contenidos. 

// Precios:
// - valor por eje: $36.000/ al tomar los 4 ejes te hacemos un descuento  🤩
//  Metodología:  https://vimeo.com/352189668 
//  TIClass, tu preu online ¿te unes?:msg

const qrcode = require('qrcode-terminal');

//Crea una sesión con whatsapp-web y la guarda localmente para autenticarse solo una vez por QR
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

//Genera el código qr para conectarse a whatsapp-web
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

//Si la conexión es exitosa muestra el mensaje de conexión exitosa
client.on('ready', () => {
    console.log('Conexion exitosa nenes');
    //var array1 = ['56985104058@c.us']

});

const forDefault = (message) => {
    if(message.body === 'Hola' || message.body ==='hola') {
        var text = `
Hola Yo soy un bot, para que te atienda un amigo humano pincha aquí 
https://api.whatsapp.com/send?phone=56995447660&text=Hola!+Quiero+hablar+con+un+asesor+de+TIClass`
        client.sendMessage(message.from, text);
    } else {
        //56985104058-1614115143@g.us
        var grupo_num_bot_avisa = '56985104058-1614115143@g.us'
        if (message.from != grupo_num_bot_avisa) {
            var text = `
Gracias por tu interés. Yo soy un bot, para que te atienda un amigo humano pincha aquí 
https://api.whatsapp.com/send?phone=56995447660&text=Hola!+Quiero+hablar+con+un+asesor+de+TIClass`
            client.sendMessage(message.from, text);
            var text2 = `
Le están hablando al 🤖 bot: 
Número del Cliente: ${message.from}
------------
Mensaje del Cliente: 
${message.body}`
            client.sendMessage(grupo_num_bot_avisa, text2);
        }
    }
    return true
}

const massiveMsgTime = (array, i) => {

    try {
        setTimeout(() => { 
            var msgs = array[i].split(':array')[0]
            var code = msgs.split('code:')[1].split(':code')[0]
            var phone = msgs.split('phone:')[1].split(':phone')[0]
            var msg = msgs.split('msg:')[1].split(':msg')[0]
            if(code === 'sendMessage') {
                client.sendMessage(phone, msg);
            }
        }, (5000*i)); // cada 5 segundo por i
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

const massiveMsg = (message) => {

    try {
        var arrays = message.body.split('arrays:')[1].split(':arrays')[0]
        var array = arrays.split('array:')

        for (let i = 1; i < array.length; i++) {
            massiveMsgTime(array, i)
        }
        return true
    } catch (error) {
        return false
    }
}

const massivePhoneMsg = (message) => {

}


const oneMsg = (message) => {

    try {
        var code = message.body.split('code:')[1].split(':code')[0]
        var phone = message.body.split('phone:')[1].split(':phone')[0]
        var msg = message.body.split('msg:')[1].split(':msg')[0]
        if(code === 'sendMessage') {
            client.sendMessage(phone, msg);
            //client.sendMessage(message.from, 'Hola soy de TIClass');
        }
        return true
    } catch (error) {
        return false
    }
}

//Aquí sucede la magia, escucha los mensajes y aquí es donde se manipula lo que queremos que haga el bot
client.on('message', message => {
    const massives = massiveMsg(message)

    if (massives === false) {
        const one = oneMsg(message)
        // if (one === false) {
        //     forDefault(message)
        // }
    }
    
});

client.initialize();