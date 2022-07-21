import React from 'react';
import Layout from '../components/layout'

import {ScrollView, View} from "react-native";
import Textview from "../components/text";
import Btnview from "../components/button";
import {ScaledSheet} from "react-native-size-matters";
import ActionSheetView from "../components/actionSheet";
import Icon2 from "react-native-vector-icons/EvilIcons";
import Step from "../components/step";
import {Icon, Wizard} from "react-native-ui-lib";
import Input from "../components/input";
import DatePicker from "../components/datePicker";
import Text from "../components/text";

export default class Login extends Input {
    constructor(props) {
        super(props);
        this.refName = React.createRef()
        this.refLastName = React.createRef()
        this.refEmail = React.createRef()
        this.refPhone = React.createRef()

        this.state = {
            showAction: false,
            name: '',
            last_name: '',
            email: '',
            phone: '',
            date: '',
            otp: '',
            error: ''
        };

    }

    resetInputs = () => {
        this.setState({
            name: '',
            last_name: '',
            email: '',
            phone: '',
            date: '',
            otp: '',
        })
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    onPressButton() {
        // RootNavigation.navigate('Dashboard', {userName: 'Lucy'});
        this.setState({showAction: true});
    }

    render() {
        const handleError = (value) => {
            console.log("JEJE")
            console.log(value)
            this.setState({error: value})
        }
        const inputs = [
            {
                name: "name",
                required: true,
                type: 'text',
                placeholder: 'Name',
                ref: this.refName,
                valor: undefined,
                handleE: handleError,
            },
            {
                name: "last_name",
                required: true,
                type: 'text',
                placeholder: 'Last name',
                ref: this.refLastName,
                valor: undefined,
                handleE: handleError,
            }, {
                name: "email",
                required: true,
                type: 'email',
                placeholder: 'Email address',
                ref: this.refEmail,
                valor: undefined,
                handleE: handleError,
            }, {
                name: "phone",
                required: true,
                type: 'phone',
                placeholder: 'Phone number',
                ref: this.refPhone,
                valor: undefined,
                min: 11,
                max: 11,
                handleE: handleError,
            },
        ]

        const steps = [
            {
                name: "Datos",
                validate: [this.state.name, this.state.last_name, this.state.email, this.state.phone],
                stepState: Wizard.States.DISABLED,
                step:
                    <View style={styles.inputs}>
                        {inputs.map((input, index) => (
                            <>
                                <Input
                                    key={index}
                                    name={input.name}
                                    required={input.required}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    ref={input.ref}
                                    valor={input.valor}
                                    min={input.min}
                                    max={input.max}
                                    changeStatus={(value) => {
                                        let x = this.state
                                        x[input.name] = value
                                        this.setState(x)
                                    }}
                                    handleE={(value) => input.handleE(value)}
                                />
                            </>
                        ))}
                    </View>
            },
            {
                name: "Fecha de nacimiento",
                validate: [this.state.date],
                stepState: Wizard.States.DISABLED,
                step:
                    <View style={styles.inputs}>
                        <DatePicker
                            input={() => input()}
                            setValue={(value) => this.setState({date: value})}/>
                    </View>
            },
            {
                name: "Confirmación",
                validate: [this.state.otp],
                stepState: Wizard.States.DISABLED,
                step:
                    <View style={styles.inputs}>
                        <Input
                            name="otp"
                            required={true}
                            type={'numero'}
                            placeholder={'OTP'}
                            ref={"otp"}
                        />
                    </View>
            }
        ]

        const input = () => (
            <Input
                name="date"
                required={true}
                type={'text'}
                placeholder={'Date'}
                valor={this.state.date}
            />
        )

        const getBody = () => (
            <>
                <View style={styles.containerBody}>
                    <ScrollView>
                        <View style={styles.child}>
                            <View style={styles.headerBody}>
                                <View style={styles.iconBody}>
                                    <Icon2 name="close" size={30} color="#1f2226"
                                           onPress={() => {
                                               this.setState({showAction: false})
                                               this.resetInputs()
                                               this.clearErrorValid()
                                           }}/>
                                </View>
                                <Textview style={styles.title}>
                                    Create an account
                                </Textview>
                            </View>
                            <View style={styles.inputGroupBody}>
                                <View style={styles.inputsBody}>
                                    <Step steps={steps} error={this.state.error} estado={this.state}/>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </>
        )

        return (
            <Layout style={styles.layout}>
                <View style={styles.container}>
                    <View style={styles.child}>
                        <View style={styles.header}>
                            <Icon
                                source={require('../assets/logo.png')}
                                cover={true} forwardedRef={''} size={350}/>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.child}>
                                <Textview style={styles.title}>
                                    Hey! Welcome
                                </Textview>
                                <Textview style={styles.subtitle}>
                                    We deliver on-demand organic fresh fruits directly from your nearby farms
                                </Textview>
                            </View>
                            <View style={styles.btn}>
                                <Btnview label={'Get Started'} onPress={() => this.setState({showAction: true})}/>
                                <Textview style={styles.options}>
                                    I already have an account
                                </Textview>
                            </View>
                        </View>

                    </View>
                    <ActionSheetView showAction={this.state.showAction}
                                     setShowAction={(value) => this.setState({showAction: value})}
                                     getBody={() => getBody()}
                                     resetInputs={() => this.resetInputs()}
                                     clearError={() => this.clearErrorValid()}
                    />
                </View>
            </Layout>
        );
    }
}
const styles = ScaledSheet.create({
    layout: {
        backgroundColor: '#f2f2f2'
    },
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    child: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '8%',
        width: '100%',
        height: '50%'
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
    subtitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#767d85',
        paddingTop: '2%',
        width: '80%'
    },
    btn: {
        marginTop: '10%',
        display: 'flex',
        justifyContent: 'center',
        width: '90%'
    },
    options: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#767d85',
        paddingTop: '8%',
        width: '100%',
        fontWeight: 'bold'
    },
    containerBody: {
        width: '100%',
        borderRadius: 40,
        display: 'flex',
        backgroundColor: '#f2f2f2',
        justifyContent: 'center'
    },
    inputsBody: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    headerBody: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '8%',
        marginTop: '5%',
        width: '100%',
        height: '10%'
    },
    iconBody: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '5%'
    },
    inputGroupBody: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%'
    },
    btnsBody: {
        marginTop: '10%',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '18%'
    },
    btnBody: {
        paddingTop: '2%'
    }
});
