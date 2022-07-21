import {StyleSheet, View} from "react-native";
import {Wizard} from "react-native-ui-lib";
import Input from "./input";
import Btnview from "./button";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import withReactContent from 'sweetalert2-react-content'


export default class Step extends Input {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
            completedStepIndex: undefined,
            allTypesIndex: 0,
            toastMessage: undefined,
            error: ''
        };

    }

    render() {
        const MySwal = withReactContent(Swal)
        const renderSteps = () => (
            this.props.steps.map((step, index) => (
                <Wizard.Step state={step.stepState} label={step.name} key={index}/>
            ))
        )

        const renderCurrentStep = () => (
            this.props.steps.map((step, index) => {
                if (this.state.activeIndex == index) {
                    return step.step
                }
            })

        );

        const renderNextButton = () => {
            if (this.state.activeIndex != this.props.steps.length - 1) {
                return (
                    <Btnview label={'Next'} onPress={() => goToNextStep()}/>
                );
            } else {
                return (
                    <Btnview label={"Create an account"} onPress={() => console.log("PRESS")}/>
                );
            }
        }

        const goToPrevStep = () => {
            const {activeIndex: prevActiveIndex} = this.state;
            const activeIndex = prevActiveIndex === 0 ? 0 : prevActiveIndex - 1;

            this.setState({activeIndex});
        };

        const onActiveIndexChangedMine = (activeIndex) => {
            this.setState({activeIndex});
        };


        const goToNextStep = () => {
            let alerta = false
            const validations = this.props.steps[this.state.activeIndex].validate
            console.log(validations)

            validations.map((validation) => {
                if (alerta) {
                    return
                }
                if (validation === '') {
                    alerta = true
                    return alert("Debe rellenar todos los campos")
                }
            })

            if (!this.props.error && !alerta) {
                const {activeIndex: prevActiveIndex, completedStepIndex: prevCompletedStepIndex} = this.state;
                const resetData = prevActiveIndex === this.props.steps.length;
                if (resetData) {
                    // reset();
                    return;
                }

                const activeIndex = prevActiveIndex + 1;
                let completedStepIndex = prevCompletedStepIndex;
                if (!prevCompletedStepIndex || prevCompletedStepIndex < prevActiveIndex) {
                    completedStepIndex = prevActiveIndex;
                }

                if (activeIndex !== prevActiveIndex || completedStepIndex !== prevCompletedStepIndex) {
                    this.setState({activeIndex, completedStepIndex});
                }
            }
        };

        return (
            <>
                <Wizard testID={'uilib.wizard'} activeIndex={this.state.activeIndex}
                        onActiveIndexChanged={onActiveIndexChangedMine} containerStyle={styles.stepper}>
                    {renderSteps()}
                </Wizard>
                {renderCurrentStep()}

                <View style={styles.btns}>
                    <View style={styles.btn}>
                        {this.state.activeIndex == 0 ?
                            <></>
                            :
                            <Btnview label={'Back'} onPress={() => goToPrevStep()} tipo={"secundario"}/>
                        }

                    </View>
                    <View style={styles.btn}>
                        {renderNextButton()}
                    </View>
                </View>
            </>
        )
    }

}

const styles = StyleSheet.create({
    stepper: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        marginBottom: '5%'
    },
    btns: {
        marginTop: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: '20%'
    },
    btn: {
        width: '100%',
        paddingTop: '2%',
        display: 'flex',
        justifyContent: 'center',
    },
});