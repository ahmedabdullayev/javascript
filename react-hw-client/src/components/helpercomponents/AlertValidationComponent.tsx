import React, {Component,useEffect} from "react";
export enum EAlertValidationClass {
    Primary = 'alert-primary',
    Success = 'alert-success',
    Danger = 'alert-danger',
    Warning = 'alert-warning',
}
interface MyProps{
    show: boolean,
    message: string,
    alertClass: EAlertValidationClass
}
// class AlertValidationComponent extends Component<MyProps>{
//     componentDidUpdate(prevProps : MyProps) {
//         if(prevProps.show !== this.props.show)
//         console.log("updated")
//     }
//
//     render() {
//         return this.props.show ? <div className={'alert ' + this.props.alertClass} role="alert">{this.props.message}</div> : null;
//     }
// }
const AlertValidationComponent = (props: {show: boolean, message: string, alertClass: EAlertValidationClass }) => {
    useEffect(() => {
        console.warn("HERE!" + props.show)
    }, [props.show])

    return props.show ? <div className={'alert ' + props.alertClass} role="alert">{props.message}</div> : null;
}
export default AlertValidationComponent;