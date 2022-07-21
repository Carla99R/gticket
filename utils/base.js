import React from 'react'
import * as SecureStore from 'expo-secure-store';
import {CommonActions, StackActions} from '@react-navigation/native';
import moment from 'moment'
import * as Device from 'expo-device';


import {
    AppState

} from 'react-native';

function encAES(txt) {

    var encrypted = global.CryptoJS.AES.encrypt(txt, global.CryptoJS.enc.Utf8.parse(global.tokeninit + global.tokenws), {
        mode: global.CryptoJS.mode.ECB,
        padding: global.CryptoJS.pad.Pkcs7
    });
    var b64 = encrypted.toString()
    var e64 = global.CryptoJS.enc.Base64.parse(b64);
    var eHex = e64.toString(global.CryptoJS.enc.Hex);
    //decAES(eHex)

    return eHex;
}

function decAES(txt) {
    var reb64 = global.CryptoJS.enc.Hex.parse(txt);
    var bytes = reb64.toString(global.CryptoJS.enc.Base64);
    var decrypt = global.CryptoJS.AES.decrypt(bytes, global.CryptoJS.enc.Utf8.parse(global.tokeninit + global.tokenws), {
        mode: global.CryptoJS.mode.ECB,
        padding: global.CryptoJS.pad.Pkcs7
    });
    var plain = decrypt.toString(global.CryptoJS.enc.Utf8);
    return plain;
}

class Base extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            timeACTIVE: 0,
        }

    }

    /**
     * letra sin espacio
     * @param {*} str
     */
    onlyLetters(str) {
        if (str == '') {
            return true
        }

        return str.match("^[a-zA-Z]+$");
    }

    /**
     * letra con espacio
     * @param {*} str
     */
    onlyLettersSpaceOnly(str) {
        if (str == '') {
            return true
        }

        return str.match("^[a-zA-Z ]+$");
    }

    /**
     * letra sin espacio y numero
     * @param {*} str
     */
    onlyLettersFull(str) {
        if (str == '') {
            return true
        }

        return str.match("^[a-zA-Z0-9]+$");
    }

    /**
     * letra con espacio y numero
     * @param {*} str
     */
    onlyLettersFullSpace(str) {
        if (str == '') {
            return true
        }

        return str.match("^[a-zA-Z0-9 ]+$");
    }

    /**
     * letra con espacio, caracteres y numero
     * @param {*} str
     */
    onlyLettersFullSpaceCaract(str) {
        if (str == '') {
            return true
        }

        return str.match("^[a-zA-Z0-9 ·&-,]+$");
    }

    /**
     * formato RIF o cedula
     * @param {*} str
     */
    onlyLettersRIF(str) {
        if (str == '') {
            return true
        }
        if (String(str).length == 1) {
            var ss = String(str).substr(0, 1).match("^[JPVEGC]");
            return ss;
        } else if (String(str).length == 2) {
            return true;
        } else {
            return String(str).substr(2).match("^[0-9]+$");

        }
    }

    onlyMail(str) {
        if (str == '') {
            return true
        }
        return str.match("^[a-zA-Z@.0-9-+_]+$");

    }

    validMail(str) {
        var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        return /^((([a-z0-9]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(String(str).toLowerCase());


    }

    onlyNumber(str) {
        if (str == '') {
            return true
        }
        var reg = /^[0-9]+$/;

        if (reg.test(str)) {
            return str;
        } else {
            return false;
        }
    }

    onlyNumberDecimal(str) {
        if (str == '') {
            return true
        }
        var reg = /^[.0-9]+$/;
        if (reg.test(str)) {
            return str;
        } else {
            return false;
        }
    }

    mensaje(m, tipo = 'error') {

    }

    textTitle(s) {
        s = String(s).toLowerCase()
        if (typeof s !== 'string') return ''
        var dd = ""
        s.split(" ").map((e) => {
            dd = dd + String(e).charAt(0).toUpperCase() + String(e).substring(1) + " "
        })
        return dd
    }

    notificacion(m) {

    }

    actionLoadView() {
        this.setState({load: true});
    }

    actionLoadHidden() {
        this.setState({load: false});
    }

    async saveLocal(name, obj) {

        if (!obj.ver) {
            obj.ver = global.keyversionFace
            var getDB = await SecureStore.setItemAsync(name, encAES(JSON.stringify(obj)));

        } else if (obj.ver == global.keyversionFace) {
            var getDB = await SecureStore.setItemAsync(name, encAES(JSON.stringify(obj)));

        }

    }

    async getLocal(name) {

        var getDB = await SecureStore.getItemAsync(name);
        if (getDB && getDB != undefined) {
            try {
                var data = JSON.parse(getDB);
                if (data != undefined) {
                    return data;
                } else {
                    return {}

                }
            } catch (error) {
                var data = JSON.parse(decAES(getDB));
                if (data != undefined) {
                    return data;
                } else {
                    return {}
                }
            }

        } else {
            return {}
        }
    }

    async removeLocal(name) {
        var getDB = await SecureStore.deleteItemAsync(name);

    }

    async clearLocal(name) {
        var getDB = await SecureStore.deleteItemAsync(name);
    }

    onErrorTime() {
        this.mensaje(global.mensaje.init("401"))
    }

    onError() {
        this.mensaje(global.mensaje.init("401"))
    }
}

export default Base;
