/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import MDInputRoot from "components/MDInput/MDInputRoot";
import { validateEmail, validatePhone, validateURL, validateColor } from "utils/validate";
import { t } from "hooks/web/useI18n";

const MDInput = forwardRef(
  ({ error, success, disabled, validate, required, type, ...rest }, ref) => {
    const [validationError, setValidationError] = useState(null);

    const validateValue = (value) => {
      if (required && value.trim() === "") {
        setValidationError(t("login.requiredField"));
      } else if (validate) {
        switch (type) {
          case "email":
            if (!validateEmail(value)) {
              setValidationError(t("login.invalidEmail"));
            } else {
              setValidationError(null);
            }
            break;
          case "tel":
            if (!validatePhone(value)) {
              setValidationError(t("login.invalidPhone"));
            } else {
              setValidationError(null);
            }
            break;
          case "url":
            if (!validateURL(value)) {
              setValidationError(t("login.invalidURL"));
            } else {
              setValidationError(null);
            }
            break;
          case "color":
            if (!validateColor(value)) {
              setValidationError(t("login.invalidColor"));
            } else {
              setValidationError(null);
            }
            break;
          default:
            setValidationError(null);
        }
      } else {
        setValidationError(null);
      }
    };

    return (
      <MDInputRoot
        {...rest}
        ref={ref}
        ownerState={{
          error: error || !!validationError,
          success,
          disabled,
        }}
        helperText={validationError}
        onBlur={(e) => validateValue(e.target.value)}
        required={required}
      />
    );
  }
);

MDInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
  validate: false,
  required: false,
  type: "text",
};

MDInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  validate: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
};

export default MDInput;
