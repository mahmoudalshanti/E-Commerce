/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(err) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(err, info) {
    console.log(err);
    console.log(info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went Wrong</h1>;
    }
    return this.props.children;
  }
}
