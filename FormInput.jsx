
<Field
  name="lastname"
  component={this.renderAddressInputs}
  label="Your Last Name"
  type="text"
  validate={[required({ msg: "Please Provide Your Last Name" })]}
/>
<Field
  name="address-line-1"
  component={this.renderAddressInputs}
  label="Address Line 1"
  type="text"
  validate={[
    required({ msg: "Please Provide Shipping Address Line 1" })
  ]}
/>
<Field
  name="address-line-2"
  component={this.renderAddressInputs}
  label="Address Line 2"
  type="text"
  validate={[
    required({ msg: "Please Provide Shipping Address Line 2" })
  ]}
/>
<Field
  name="city"
  component={this.renderAddressInputs}
  label="City"
  type="text"
  validate={[required({ msg: "Your Shipping City is required" })]}
/>
<Field
  name="state"
  component={this.renderAddressInputs}
  label="State"
  type="text"
/>
<Field
  name="zipcode"
  component={this.renderAddressInputs}
  label="Zip code"
  type="number"
  validate={[
    required({ msg: "Zip Code is Required " }),
    numericality({
      int: true,
      msg: "Please Provide a Valid Zip Code (ex: 129045)"
    })
  ]}
/>
<Field
  name="country"
  component={this.renderAddressInputs}
  label="Country"
  validate={[required({ msg: "Your shipping country is required" })]}
/>
