import React from 'react';
import Layout from '../components/layout'

import {View} from "react-native";
import Textview from "../components/text";
import Text from "../components/text";
import Btnview from "../components/button";
import {ScaledSheet} from "react-native-size-matters";
import ActionSheetView from "../components/actionSheet";
import Icon2 from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/FontAwesome";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import Step from "../components/step";
import {Icon, LoaderScreen, Wizard} from "react-native-ui-lib";
import Input, {formatMoney} from "../components/input";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import SmsRetriever from 'react-native-sms-retriever';
import * as ImagePicker from 'expo-image-picker';
import DatePicker from "../components/datePicker";

export default class Login extends Input {
    constructor(props) {
        super(props);
        this.refName = React.createRef()
        this.refLastName = React.createRef()
        this.refEmail = React.createRef()
        this.refPhone = React.createRef()
        this.refCi = React.createRef()

        this.state = {
            showAction: false,
            name: '',
            last_name: '',
            ci: '',
            validCi: false,
            validPhoto: false,
            email: '',
            phone: '',
            date: '',
            singleFile: {
                name: '',
                uri: '',
                type: ''
            },
            singlePhoto: {
                name: '',
                uri: '',
                type: ''
            },
            loading: false,
            otp: '',
            error: '',
            errorFile: '',
            errorPhoto: ''
        };

    }

    resetInputs = () => {
        this.setState({
            name: '',
            last_name: '',
            ci: '',
            validCi: false,
            validPhoto: false,
            email: '',
            phone: '',
            date: '',
            otp: '',
            singleFile: {
                name: '',
                uri: '',
                type: ''
            },
            singlePhoto: {
                name: '',
                uri: '',
                type: ''
            },
            loading: false,
            error: '',
            errorFile: '',
            errorPhoto: ''
        })
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        this.otp().then(r => console.log(r))
    }

    otp = async () => {
        try {
            const registered = await SmsRetriever.startSmsRetriever();
            if (registered) {
                await SmsRetriever.addSmsListener(event => {
                    console.log(event.message);
                    SmsRetriever.removeSmsListener();
                });
            }
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }

    onPressButton() {
        // RootNavigation.navigate('Dashboard', {userName: 'Lucy'});
        this.setState({showAction: true});
    }

    handleError = (value) => {
        this.setState({error: value})
    }

    pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let r = await ImagePicker.requestMediaLibraryPermissionsAsync()
        console.log(r)
        if (r.status == 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 0.5
            });

            console.log(result);
            console.log(result.uri);

            if (!result.cancelled) {
                const fileName = result.uri.split('/').pop();
                const fileType = fileName.split('.').pop();
                //
                // console.log(fileName, fileType);
                this.setState({
                    singleFile: {
                        name: fileName,
                        uri: result.uri,
                        type: fileType
                    },
                    loading: true
                })
                await this.uploadImage()
            }
        }


    };

    takePhoto = async () => {
        // No permissions request is necessary for launching the image library
        let r = await ImagePicker.requestCameraPermissionsAsync()
        console.log(r)
        if (r.status == 'granted') {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 0.5
            });

            console.log(result);

            if (!result.cancelled) {
                const fileName = result.uri.split('/').pop();
                const fileType = fileName.split('.').pop();
                //
                // console.log(fileName, fileType);
                this.setState({
                    singlePhoto: {
                        name: fileName,
                        uri: result.uri,
                        type: fileType
                    },
                    loading: true
                })
                await this.uploadPhoto()
            }
        }


    };

    uploadImage = async () => {
        //Check if any file is selected or not
        if (this.state.singleFile.uri != null) {
            var formdata = new FormData();
            formdata.append("file", {
                uri: this.state.singleFile.uri,
                name: this.state.singleFile.name,
                type: this.state.singleFile.type
            });
            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            await fetch("http://128.199.37.161:5000/file", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result)
                    const compare = formatMoney(this.state.ci)
                    const comparator = result.includes(compare);
                    this.setState({validCi: comparator})
                    console.log("comparator")
                    console.log(comparator)
                    if (comparator === false) {
                        this.setState({errorFile: "La cédula no coincide"})
                    } else {
                        this.setState({errorFile: ""})
                    }
                })
                .catch(error => {
                    console.log('error', error)
                    this.setState({
                        singleFile: {
                            name: '',
                            uri: '',
                            type: ''
                        }
                    })
                    alert(error);
                });

        } else {
            //if no file selected the show alert
            this.setState({
                singleFile: {
                    name: '',
                    uri: '',
                    type: ''
                }
            })
            alert('Please Select File first');
        }
        this.setState({loading: false})
    };

    uploadPhoto = async () => {
        //Check if any file is selected or not
        if (this.state.singleFile.uri != null) {
            var formdata = new FormData();
            formdata.append("picture", {
                uri: this.state.singlePhoto.uri,
                name: this.state.singlePhoto.name,
                type: this.state.singlePhoto.type
            });
            formdata.append("file", {
                uri: this.state.singleFile.uri,
                name: this.state.singleFile.name,
                type: this.state.singleFile.type
            });
            formdata.append("name", this.state.name)
            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            await fetch("http://128.199.37.161:5000/recognize", requestOptions)
                .then(response => response.text())
                .then(result => {
                    const resp = JSON.parse(result)
                    console.log(resp)
                    console.log(resp.response)
                    if (resp.code == 1) {
                        this.setState({errorPhoto: resp.response})
                    } else {
                        this.setState({errorPhoto: ""})
                    }

                })
                .catch(error => {
                    console.log('error', error)
                    this.setState({
                        singlePhoto: {
                            name: '',
                            uri: '',
                            type: ''
                        }
                    })
                    alert(error);
                });

        } else {
            //if no file selected the show alert
            this.setState({
                singlePhoto: {
                    name: '',
                    uri: '',
                    type: ''
                }
            })
            alert('Please Select File first');
        }
        this.setState({loading: false})
    };

    render() {

        const inputs = [
            {
                name: "name",
                required: true,
                type: 'text',
                placeholder: 'Name',
                ref: this.refName,
                valor: this.state.name,
                handleE: this.handleError,
            },
            {
                name: "last_name",
                required: true,
                type: 'text',
                placeholder: 'Last name',
                ref: this.refLastName,
                valor: this.state.last_name,
                handleE: this.handleError,
            },
            {
                name: "ci",
                required: true,
                type: 'numero',
                placeholder: 'Document',
                ref: this.refCi,
                valor: this.state.ci,
                min: 7,
                limite: 8,
                handleE: this.handleError,
            },
            {
                name: "email",
                required: true,
                type: 'email',
                placeholder: 'Email address',
                ref: this.refEmail,
                valor: this.state.email,
                handleE: this.handleError,
            }, {
                name: "phone",
                required: true,
                type: 'phone',
                placeholder: 'Phone number',
                ref: this.refPhone,
                valor: this.state.phone,
                min: 11,
                limite: 11,
                handleE: this.handleError,
            },
        ]

        const steps = [
            {
                name: "Datos",
                validate: [this.state.name, this.state.last_name, this.state.ci, this.state.email, this.state.phone],
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
                                    limite={input.limite}
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
                name: "Subir documentos",
                validate: [this.state.singleFile.name, this.state.validCi],
                stepState: Wizard.States.DISABLED,
                step:
                    <View style={styles.inputs}>
                        <Textview style={styles.info}>
                            Por favor, adjunte una foto de su cécula
                        </Textview>
                        <View style={styles.icon}>
                            {this.state.loading ?
                                <LoaderScreen color={"#30cab1"} message="Loading..." overlay style={styles.loader}/>
                                :
                                <>
                                    <Icon3 name="upload" size={30} color="#1f2226"
                                           onPress={() => {
                                               this.pickImage().then(r => console.log(r))
                                           }}/>
                                    <Textview>
                                        {this.state.singleFile.name}
                                    </Textview>
                                    {this.state.errorFile ? <Text
                                        style={{
                                            color: 'red',
                                            textAlign: "left",
                                            paddingHorizontal: 4
                                        }}>{this.state.errorFile}</Text> : null}
                                </>
                            }
                        </View>

                    </View>
            },
            {
                name: "Subir foto",
                validate: [this.state.singlePhoto.name, this.state.validPhoto],
                stepState: Wizard.States.DISABLED,
                step:
                    <View style={styles.inputs}>
                        <Textview style={styles.info}>
                            Por favor, tómese una foto
                        </Textview>
                        <View style={styles.icon}>
                            {this.state.loading ?
                                <LoaderScreen color={"#30cab1"} message="Loading..." overlay style={styles.loader}/>
                                :
                                <>
                                    <Icon4 name="add-a-photo" size={30} color="#1f2226"
                                           onPress={() => {
                                               this.takePhoto().then(r => console.log(r))
                                           }}/>
                                    <Textview>
                                        {this.state.singlePhoto.name}
                                    </Textview>
                                    {this.state.errorPhoto ? <Text
                                        style={{
                                            color: 'red',
                                            textAlign: "left",
                                            paddingHorizontal: 4
                                        }}>{this.state.errorPhoto}</Text> : null}
                                </>
                            }
                        </View>

                    </View>
            },
            {
                name: "Confirmación",
                validate: [this.state.otp],
                stepState: Wizard.States.DISABLED,
                step:
                    <View style={styles.inputs}>
                        <OTPInputView
                            style={styles.otpInput}
                            pinCount={4}
                            codeInputFieldStyle={styles.codeInput}
                            code={this.state.otp}
                            onCodeChanged={(value) => this.setState({otp: value})}
                            autoFocusOnLoad
                            onCodeFilled={(code) => console.log(code)}
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
                    <KeyboardAwareScrollView>
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
                    </KeyboardAwareScrollView>
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
    otpInput: {
        height: '10%',
        marginTop: '8%',
    },
    codeInput: {
        color: '#1f2226',
        borderColor: '#767d85',
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
    },
    info: {
        textAlign: 'center',
        color: '#767d85',
        width: '100%',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        paddingTop: '5%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    loader: {
        paddingTop: '15%'
    }
});
