import {Dialog, PanningProvider} from "react-native-ui-lib";
import Base from "../utils/base";
import {Dimensions} from "react-native";
import React from "react";
import {ScaledSheet} from "react-native-size-matters";

export default class ActionSheetView extends Base {
    constructor(props) {
        super(props);
    }

    windowWidth = Dimensions.get('window').width;
    windowHeight = Dimensions.get('window').height;

    render() {
        return (
            <Dialog
                visible={this.props.showAction}
                bottom={true}
                onDismiss={() => {
                    this.props.setShowAction(false)
                    this.props.resetInputs()
                    this.props.clearError()
                }}
                panDirection={PanningProvider.Directions.DOWN}
                height={this.windowHeight}
                width={this.windowWidth}
                useSafeArea={false}
                containerStyle={styles.dialog}
            >
                {this.props.getBody()}
            </Dialog>
        )
    }

}

const styles = ScaledSheet.create({
    dialog: {
        // marginTop: 170,
        display: 'flex',
        justifyContent: 'flex-end',
        borderRadius: 40,
        overflow: 'hidden',
        height: '100%',
    },
    container: {
        width: '100%',
        borderRadius: 40,
        display: 'flex',
        backgroundColor: '#f2f2f2',
        justifyContent: 'center'
    },
    child: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputs: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '8%',
        marginTop: '5%',
        width: '100%',
        height: '10%'
    },
    icon: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '5%'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24@vs',
        fontWeight: 'bold',
        color: '#1f2226'
    },
    body: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        width: '100%',
        opacity: 0.2,
        borderBottomColor: '#767d85',
        borderBottomWidth: 2,
    },
    inputGroup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%'
    },
    subtitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        // textJustify: 'center',
        color: '#767d85',
        paddingTop: '2%',
        width: '80%'
    },
    btns: {
        marginTop: '10%',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '18%'
    },
    btn: {
        paddingTop: '2%'
    },
    options: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        // textJustify: 'center',
        color: '#767d85',
        paddingTop: '8%',
        width: '100%',
        fontWeight: 'bold'
    }
});

