import {DateTimePicker} from "react-native-ui-lib";
import moment from "moment";

const DatePicker = (props) => {

    const onChange = (e) => {
        const date = moment(e).format('MMMM DD, YYYY')
        props.setValue(date)
    }

    return (
        <DateTimePicker
            name={'date'}
            containerStyle={{marginVertical: 20}}
            placeholder={'Select a date'}
            renderInput={props.input}
            dateFormat={'MMM D, YYYY'}
            onChange={(e) => onChange(e)}
        />
    )
}
export default DatePicker