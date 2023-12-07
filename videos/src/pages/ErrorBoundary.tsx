import React from "react";

class ErrorBoundary extends React.Component<{children: any}, {errorOccurred: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {errorOccurred: false};
    }
    static getDerivedStateFromError(e:any){
        return {errorOccurred: true}
    }
    render(){
        if (this.state.errorOccurred){
            return(
                <div>
                    <h1>Connecting to the API failed! :/</h1>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary
