"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CartItemAmount = (function (_React$Component) {
    _inherits(CartItemAmount, _React$Component);

    function CartItemAmount() {
        _classCallCheck(this, CartItemAmount);

        _get(Object.getPrototypeOf(CartItemAmount.prototype), "constructor", this).apply(this, arguments);

        this.state = {
            error: null,
            lastSavedValue: this.props.value,
            renderSelect: false,
            renderSubmit: false,
            result: null,
            sending: false,
            value: this.props.value
        };
    }

    _createClass(CartItemAmount, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.state.value < this.props.thresholdValue) {
                this.setState({ renderSelect: true });
            }
        }
    }, {
        key: "change",
        value: function change(event) {
            var newValue = event.target.value;
            this.setState({ result: null });
            if (newValue != this.props.thresholdValue || !this.state.renderSelect) {
                this.setState({ value: newValue });
            }
            if (newValue >= this.props.thresholdValue) {
                this.setState({ renderSelect: false });
            }
            if (newValue < this.props.thresholdValue && this.state.renderSelect) {
                this.sendQuantity(newValue);
            }

            if (!this.state.renderSelect && !this.state.sending) {
                this.setState({ renderSubmit: true });
            }
        }
    }, {
        key: "valueChanged",
        value: function valueChanged() {
            return this.state.lastSavedValue != this.state.value;
        }
    }, {
        key: "checkKey",
        value: function checkKey(event) {
            if (event.key == "Enter" && this.valueChanged()) {
                this.sendQuantityWrapper();
            }
        }
    }, {
        key: "sendQuantityWrapper",
        value: function sendQuantityWrapper() {
            this.sendQuantity(this.refs.inputQuantity.props.value);
        }
    }, {
        key: "sendQuantity",
        value: function sendQuantity(quantity) {
            var _this = this;

            this.setState({ renderSubmit: false });
            this.setState({ sending: true });

            $.ajax({
                url: this.props.url,
                method: "post",
                data: { quantity: quantity },
                complete: function complete() {
                    _this.setState({ sending: false });
                    if (quantity < _this.props.thresholdValue) {
                        _this.setState({ renderSelect: true });
                    }
                },
                success: function success(response) {
                    if (!quantity) {
                        if (!response.total) {
                            location.reload();
                        }
                        $(React.findDOMNode(_this)).parents("tr").fadeOut(function () {
                            $(this).remove();
                        });
                    }
                    _this.setState({ result: "success", lastSavedValue: quantity });
                    setTimeout(function () {
                        _this.setState({ result: null });
                    }, 1000);
                },
                error: function error(response) {
                    _this.setState({ error: response.responseJSON.error.quantity, result: "error" });
                }
            });
        }
    }, {
        key: "removeFromCart",
        value: function removeFromCart() {
            this.sendQuantity(0);
        }
    }, {
        key: "render",
        value: function render() {
            var _React$addons$classSet,
                _this2 = this;

            var classNames = React.addons.classSet((_React$addons$classSet = {}, _defineProperty(_React$addons$classSet, this.props.className, true), _defineProperty(_React$addons$classSet, "has-success", this.state.result == "success"), _defineProperty(_React$addons$classSet, "has-error", this.state.result == "error"), _React$addons$classSet));

            var select = React.createElement(
                "select",
                { onChange: this.change.bind(this), value: this.state.value, className: "form-control cart-item-quantity-select" },
                this.props.options.map(function (option) {
                    return React.createElement(CartItemAmountOption, { key: option, value: option, label: option == _this2.props.thresholdValue ? option + " +" : option });
                })
            );

            var classNamesInput = React.addons.classSet({
                "input-group": true,
                "cart-item-quantity": true,
                "no-submit": (!this.state.renderSubmit || !this.valueChanged()) && !(this.state.result == "error")
            });
            var input = React.createElement(
                "div",
                { className: classNamesInput },
                React.createElement("input", { onKeyUp: this.checkKey.bind(this), onChange: this.change.bind(this), id: "id_quantity", max: this.props.max, min: "1", ref: "inputQuantity",
                    name: "quantity", type: "number", value: this.state.value }),
                React.createElement(
                    "span",
                    { className: "input-group-btn" },
                    React.createElement(
                        "button",
                        { onClick: this.sendQuantityWrapper.bind(this), className: "btn btn-info", type: "submit" },
                        "Update"
                    )
                )
            );
            return React.createElement(
                "div",
                { className: classNames },
                this.state.renderSelect ? select : input,
                this.state.sending && !(this.state.result == "error") ? React.createElement("i", { className: "fa fa-circle-o-notch fa-spin" }) : "",
                this.state.result == "error" ? React.createElement(
                    "span",
                    { className: "error text-danger" },
                    this.state.error
                ) : "",
                React.createElement(
                    "button",
                    { type: "submit", className: "btn btn-link btn-sm cart-item-remove", onClick: this.removeFromCart.bind(this) },
                    React.createElement(
                        "span",
                        { className: "text-muted" },
                        "Remove from cart"
                    )
                )
            );
        }
    }]);

    return CartItemAmount;
})(React.Component);

var CartItemAmountOption = (function (_React$Component2) {
    _inherits(CartItemAmountOption, _React$Component2);

    function CartItemAmountOption() {
        _classCallCheck(this, CartItemAmountOption);

        _get(Object.getPrototypeOf(CartItemAmountOption.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(CartItemAmountOption, [{
        key: "render",
        value: function render() {
            var value = this.props.value;
            var label = this.props.label ? this.props.label : value;
            return React.createElement(
                "option",
                { value: value },
                label
            );
        }
    }]);

    return CartItemAmountOption;
})(React.Component);

var CartItemSubtotal = (function (_React$Component3) {
    _inherits(CartItemSubtotal, _React$Component3);

    function CartItemSubtotal() {
        _classCallCheck(this, CartItemSubtotal);

        _get(Object.getPrototypeOf(CartItemSubtotal.prototype), "constructor", this).apply(this, arguments);

        this.state = {
            value: this.props.value
        };
    }

    _createClass(CartItemSubtotal, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "span",
                null,
                this.state.value
            );
        }
    }]);

    return CartItemSubtotal;
})(React.Component);

var CartTotal = (function (_React$Component4) {
    _inherits(CartTotal, _React$Component4);

    function CartTotal() {
        _classCallCheck(this, CartTotal);

        _get(Object.getPrototypeOf(CartTotal.prototype), "constructor", this).apply(this, arguments);

        this.state = {
            value: this.props.value
        };
    }

    _createClass(CartTotal, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "b",
                null,
                this.state.value
            );
        }
    }]);

    return CartTotal;
})(React.Component);

var textInput = [];
var options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var csrftoken = $.cookie('csrftoken');
function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method)
    );
}
$.ajaxSetup({
    beforeSend: function beforeSend(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

$(".cart-item-amount").each(function (index) {
    var $input = $(this).find("input");
    var $button = $(this).find("button");
    var value = $input.val();
    var name = $input.attr("name");
    var max = $input.attr("max");
    var props = {
        className: "",
        index: index,
        max: max,
        options: options.slice(0, max),
        thresholdValue: options[options.length - 1],
        url: $(this).find("form").attr("action"),
        value: value
    };

    $(this).find(".cart-item-quantity").removeClass("js-hidden");
    $button.addClass("invisible");
    textInput.push(this.firstElementChild);

    React.render(React.createElement(CartItemAmount, props), this);
});

var $cartTotal = $(".cart-total");
var cartTotalValue = $cartTotal.text();
if ($cartTotal.length) {
    var cartTotal = React.render(React.createElement(CartTotal, { value: cartTotalValue }), $(".cart-total")[0]);
}

var cartSubtotals = [];
$(".cart-item-subtotal").each(function () {
    var productId = $(this).data("product-id");
    var props = {
        productId: productId,
        value: $(this).text()
    };
    cartSubtotals[productId] = React.render(React.createElement(CartItemSubtotal, props), this);
});

$(document).on("ajaxComplete", function (event, response) {
    var json = response.responseJSON;
    if (json.product_id && $cartTotal.length) {
        cartSubtotals[json.product_id].setState({ value: json.subtotal });
        cartTotal.setState({ value: json.total });
    }
});

var FormShippingToggler = (function (_React$Component5) {
    _inherits(FormShippingToggler, _React$Component5);

    function FormShippingToggler() {
        _classCallCheck(this, FormShippingToggler);

        _get(Object.getPrototypeOf(FormShippingToggler.prototype), "constructor", this).apply(this, arguments);

        this.state = {
            value: true
        };
    }

    _createClass(FormShippingToggler, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            $(".form-full").hide();
        }
    }, {
        key: "formFullToggle",
        value: function formFullToggle() {
            this.setState({ value: event.target.checked });
            $(".form-full").toggle();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "checkbox" },
                React.createElement(
                    "label",
                    null,
                    React.createElement("input", { checked: this.state.value, type: "checkbox", onChange: this.formFullToggle, name: "shipping_same_as_billing" }),
                    this.props.label
                )
            );
        }
    }]);

    return FormShippingToggler;
})(React.Component);

var $formFullToggle = $("#form-full-toggle");
if ($formFullToggle.length) {
    React.render(React.createElement(FormShippingToggler, { label: $formFullToggle.data("label") }), document.getElementById("form-full-toggle"));
}
