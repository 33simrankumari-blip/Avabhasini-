import React, { Component } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="aym-error-boundary">
          <div className="aym-error-card">
            <div className="aym-error-icon">
              <AlertCircle size={40} aria-hidden="true" />
            </div>
            <h1 className="aym-display">We couldn't load this content</h1>
            <p>
              An unexpected error occurred while loading this section of AYURDISHA.
              Please try reloading or return to the homepage.
            </p>
            <div className="aym-error-actions">
              <button type="button" className="aym-btn aym-btn-primary" onClick={this.handleReset}>
                <RefreshCw size={16} aria-hidden="true" /> Try again
              </button>
              <Link to="/" className="aym-btn aym-btn-outline" onClick={this.handleReset}>
                <Home size={16} aria-hidden="true" /> Back to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
