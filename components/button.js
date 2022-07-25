import React from 'react';
import Base from '../utils/base'

import {Dimensions, TouchableHighlight} from 'react-native';
import {Text, View} from 'react-native-ui-lib';

import {ScaledSheet, verticalScale} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');


export default class Btnview extends Base {
    constructor(props) {
        super(props);

        this.state = {

            tipo: "primario",
            detail: false
        }
        this.RBSheet = {}
    }

    componentDidMount() {

        if (this.props.tipo) {
            this.setState({tipo: this.props.tipo})
        }

    }

    componentDidUpdate(prevProps) {


    }

    styleTypo(estilo) {
        if (estilo == "primario") {
            return styles.btn
        }
        if (estilo == "secundario") {
            return styles.btn2
        }
        if (estilo == "opcional") {
            return styles.btn3
        }
        if (estilo == "opcional2") {
            return styles.btn4
        }
    }

    styleTypoText(estilo) {
        if (estilo == "primario") {
            return styles.btnttl
        }
        if (estilo == "secundario") {
            return styles.btnttl2
        }
        if (estilo == "opcional") {
            return styles.btnttl
        }
        if (estilo == "opcional2") {
            return styles.btnttl
        }
    }

    styleTypoPress(estilo) {
        if (estilo == "primario") {
            return "#e74211"
        }
        if (estilo == "secundario") {
            return "#fff"
        }
        if (estilo == "opcional") {
            return "#0d47a1"
        }
        if (estilo == "opcional2") {
            return "#0d47a1"
        }
    }

    styleTypoPressText(estilo) {
        if (estilo == "primario") {
            return "#e74211"
        }
        if (estilo == "secundario") {
            return "#BDBDBD"
        }
        if (estilo == "opcional") {
            return "#0d47a1"
        }
        if (estilo == "opcional2") {
            return "#0d47a1"
        }
    }

    press() {
        this.props.onPress()
    }

    pressUp() {

    }

    pressDown() {

    }

    render() {
        return (<TouchableHighlight disabled={this.props.disable ? this.props.disable : false}
                                    onPressIn={() => this.pressDown()} onPressOut={() => this.pressUp()}
                                    underlayColor={this.styleTypoPress(this.state.tipo)} onPress={() => {
                this.press()
            }} style={this.styleTypo(this.state.tipo)}>
                <View style={{
                    flex: 1,
                    flexDirection: "column",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {this.props.icon ? <View style={{position: "absolute", left: verticalScale(15)}}>
                        {this.props.icon}
                    </View> : null}
                    <Text style={this.styleTypoText(this.state.tipo)} allowFontScaling={false}>{this.props.label}</Text>
                </View>
            </TouchableHighlight>
        )

    }

}


const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnttl: {
        fontSize: '13@vs',
        fontWeight: 'bold',
        textAlign: 'center',
        //fontFamily: "RobotoBold",
        color: '#1f2226'
    },
    btnttl2: {
        fontSize: '13@vs',
        fontWeight: 'bold',
        textAlign: 'center',
        //fontFamily: "RobotoBold",
        color: '#000'
    },
    btn: {
        height: '45@vs',
        color: '#1f2226',
        backgroundColor: '#fbb827',
        opacity: 0.8,
        borderRadius: '10@vs',
        // borderWidth:verticalScale(4),
        borderColor: "#f1f1f1",
        marginTop: 2,
    },
    btn2: {
        height: '45@vs',
        color: '#1f2226',
        backgroundColor: '#FAF7F7',
        borderRadius: '10@vs',
        // borderWidth: verticalScale(4),
        // borderColor: "#fff",
        marginTop: 2,
    },
    btn3: {
        height: '45@vs',
        color: '#1f2226',
        backgroundColor: '#0d47a1',
        borderRadius: '25@vs',
        borderWidth: verticalScale(4),
        borderColor: "#f1f1f1",
        marginTop: 2,
    },
    btn4: {
        height: '45@vs',
        color: '#1f2226',
        backgroundColor: '#3367EB',
        borderRadius: '25@vs',
        borderWidth: verticalScale(4),
        borderColor: "#f1f1f1",
        marginTop: 2,
    },


});