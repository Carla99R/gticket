import React from 'react';
import Base from '../utils/base'
import Input from '../components/input'
import InputPass from '../components/inputPass'
import Layout from '../components/layout'
import Btnview from '../components/button'
import Textview from '../components/text'

import {ScaledSheet} from 'react-native-size-matters';
import {View} from "react-native";

export default class Dashboard extends Base {
    constructor(props) {
        super(props);

        this.state = {
            alerta: false,
            valid: false,
            load: false,
        };

    }

    async componentDidMount() {
        // console.log(this.props)
    }

    async componentDidUpdate() {

    }

    componentWillUnmount() {


    }


    render() {
        return (
            <Layout>
                <View style={styles.child}>
                    <Textview style={styles.text}>
                        Bienvenid@ {this.props.route.params.userName}
                    </Textview>
                </View>

            </Layout>
        );
    }
}
const styles = ScaledSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    child: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '5%',
    },
    text: {
        fontSize: '24@vs',
        fontWeight: 'bold',
        color: 'whitesmoke'
    },
    inputGroup: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputs: {
        width: '90%'
    },
    btn: {
        marginTop: '5%',
        display: 'flex',
        justifyContent: 'center',
        width: '90%'
    }
});
