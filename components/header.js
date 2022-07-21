import React, {Component} from 'react';
import {Ionicons, AntDesign, SimpleLineIcons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import Base from '../utils/base'
import Text from '../components/text'

import {
    requireNativeComponent, StyleSheet, SafeAreaView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions,
    Animated,
    Platform,
    RecyclerViewBackedScrollView,
    Keyboard,
    RefreshControl

} from 'react-native';

import {scale, verticalScale, moderateScale, ScaledSheet} from 'react-native-size-matters';

import ButtonView from '../components/button'

import {
    View, TextField, Button, Picker, Colors,
    Image,
    KeyboardAwareScrollView,
    KeyboardAwareListView,
    Toast,
    ListItem,
    LoaderScreen,
    Dialog,
    PanningProvider,
} from 'react-native-ui-lib';

const {width, height} = Dimensions.get('window');

export default class Header extends Base {
    constructor(props) {
        super(props);

        this.state = {
            load: false,
            alerta: false,
            msj: "",
            confirma: false,
            datos: [],
        };

    }

    async componentDidMount() {
        var esta = this;
    }

    hiden() {
        this.setState({confirma: false})
    }

    open() {
        this.setState({confirma: true})

    }

    render() {
        return (<>
                <View style={{flexDirection: 'row', flex: 0, marginBottom: 20}}>
                    <View style={{
                        flex: 1,
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }}>

                    </View>
                    <View style={{
                        flex: 3,
                        paddingTop: Platform.OS === 'ios' ? 10 : 50,
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }}>
                        <Image source={require('../assets/logonuevo.png')} resizeMode={'contain'}
                               style={{width: '100%', height: 40}}/>
                    </View>
                    <View style={{
                        flex: 1,
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        paddingTop: 4
                    }}>
                        <AntDesign onPress={() => this.setState({confirma: false}, () => {
                            this.setState({confirma: true})
                        })} name="logout" size={20} color="white"/>
                    </View>
                </View>
                <Dialog
                    migrate
                    useSafeArea

                    //top={position === 'top'}
                    bottom={true}
                    height={height}
                    panDirection={null}
                    // containerStyle={{ borderRadius: 12 }}
                    visible={this.state.confirma}
                    // onDismiss={() => this.setState({ confirma: true })}
                    //renderPannableHeader={renderPannableHeader}
                    //pannableHeaderProps={this.pannableTitle}
                    //supportedOrientations={this.supportedOrientations}
                    containerStyle={{justifyContent: 'flex-end', paddingBottom: Platform.OS === 'ios' ? 2 : 10}}

                >
                    <View style={{
                        backgroundColor: '#fff',
                        borderRadius: verticalScale(20),
                        flex: 0,
                        height: height * 0.60,
                        width: '100%',
                        padding: verticalScale(18),
                        justifyContent: 'flex-end'
                    }}>
                        <View style={{flex: 1, padding: 10}}>


                            <View style={{
                                flex: 0,
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center'
                            }}>

                                <View style={[{
                                    padding: 10,
                                    marginBottom: 10,
                                    borderWidth: 0,
                                    borderRadius: 20,
                                    margin: 10,
                                    backgroundColor: '#fff',
                                    flexDirection: 'column'
                                }]}>
                                    <View style={{padding: 10, paddingTop: 20}}><Text style={styles.titulo}>¿Está seguro
                                        que desea cerrar la sesión?.</Text></View>

                                    <View style={{overflow: 'hidden'}}>
                                        <Image
                                            style={{width: '100%', height: height * 0.25,}}
                                            resizeMode={'contain'}
                                            source={require('../assets/animation_300_kg018rn7.gif')}

                                        />
                                    </View>

                                </View>

                            </View>
                        </View>


                        <ButtonView label={"CONTINUAR"} onPress={() => {
                            this.setState({confirma: false});
                            this.goToLoad({accion: 'logout'})
                        }}/>
                        <ButtonView label={"CANCELAR"} onPress={() => this.setState({confirma: false})} fullWidth={true}
                                    tipo={"secundario"}/>


                    </View>
                </Dialog>

            </>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    child: {},
    modal: {
        elevation: 20,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0.5 * 20},
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * 20
    },
    modal2: {
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0.5 * 8},
        shadowOpacity: 0.2,
        shadowRadius: 0.8 * 8
    },
    titulo: {
        fontSize: 18,
        textAlign: 'center',
        //fontFamily: "Roboto",
    },
    btnttl: {
        fontSize: '14@vs',
        fontWeight: '600',
        textAlign: 'center',
        color: '#fff'
    },
    btn: {
        height: '42@vs',
        color: '#fff',
        backgroundColor: '#77B743',
        borderRadius: '10@vs'
    },
});
