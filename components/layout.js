import React, {Component} from 'react';
import Base from '../utils/base'

import {
    requireNativeComponent, StyleSheet, SafeAreaView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions,
    Animated,
    StatusBar,
    Platform,
    RecyclerViewBackedScrollView,
    Keyboard,
    ImageBackground,
    KeyboardAvoidingView,
    BackHandler

} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const {width, height} = Dimensions.get('window');

export default class Layout extends Base {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
        };

    }

    async componentDidMount() {

    }

    render() {
        return Platform.OS == "ios" ? (<><LinearGradient
                colors={["#f2f2f2", "#f2f2f2"]} start={{x: 0.5, y: 0}} end={{x: 0.5, y: 1}}
                style={{padding: 0, alignItems: 'center', borderRadius: 0, height: height, flex: 1, width: '100%'}}>
                <SafeAreaView
                    style={{flex: 1, width: '100%', height: height, position: 'relative', padding: 0, margin: 0}}>
                    <StatusBar hidden={false} networkActivityIndicatorVisible={true} backgroundColor={'#045392'}/>

                    {this.props.children}

                </SafeAreaView>
            </LinearGradient>
            </>
        ) : (<><LinearGradient
                colors={["#f2f2f2", "rgba(4,83,146,0)"]} start={{x: 0.5, y: .5}} end={{x: 0.5, y: 1}}
                style={{padding: 0, alignItems: 'center', borderRadius: 0, height: height, flex: 1, width: '100%'}}>
                <SafeAreaView style={{flex: 1, width: '100%', height: '100%', position: 'relative'}}>
                    <StatusBar hidden={false} networkActivityIndicatorVisible={true} backgroundColor={'#045392'}/>
                    <KeyboardAvoidingView
                        behavior={"height"}
                        style={{flex: 1, width: '100%'}}
                    >

                        {this.props.children}
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>
            </>
        );
    }
}
